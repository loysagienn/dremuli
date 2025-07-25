export type AnimationController = {
  // Set value with animation
  move: (
    value: number,
    distanceFactor: number,
    startAnimationSpeed?: number
  ) => void;
  // Set value without animation
  set: (value: number) => void;
  destroy: () => void;
};

// 60 frames per second
const TARGET_FRAME_STEP_SIZE = 1000 / 60;
const SLOW_DOWN_FACTOR = 10;

type FrameHandler = (timestamp: number) => void;

let nextFramePlanned = false;
let animationFrames: FrameHandler[] = [];

function requestFrame(handler: FrameHandler) {
  animationFrames.push(handler);

  if (nextFramePlanned) {
    return;
  }

  nextFramePlanned = true;

  requestAnimationFrame((timestamp) => {
    const currentFrames = animationFrames;
    animationFrames = [];

    nextFramePlanned = false;

    for (let i = 0; i < currentFrames.length; i++) {
      const handler = currentFrames[i];

      handler(timestamp);
    }
  });
}

export function initAnimationController(
  defaultValue: number,
  setValue: (value: number) => void,
  onAnimationStop?: () => void
): AnimationController {
  let targetValue = defaultValue;
  let activeValue = defaultValue;
  let animationSpeed = 0;
  let lastFrameTime: number | null = null;
  // If the value changed from 33 to 126 - is it a lot or a little? distanceFactor is needed to understand this
  // If distanceFactor is greater, the animation will be longer, if less, it will be faster
  let distanceFactor = 0;
  let treshold = 0;
  let active = false;
  let destroyed = false;

  const updateValue = (value: number) => {
    if (destroyed) {
      return;
    }

    activeValue = value;
    setValue(value);
  };

  const finishAnimation = () => {
    updateValue(targetValue);
    lastFrameTime = null;
    animationSpeed = 0;
    active = false;

    if (onAnimationStop) {
      onAnimationStop();
    }
  };

  const set = (value: number) => {
    if (destroyed) {
      return;
    }

    if (value !== activeValue) {
      targetValue = value;
      updateValue(value);
    }
  };

  const animate = (timestamp: number) => {
    if (destroyed) {
      return;
    }

    const diff = targetValue - activeValue;
    const absDiff = Math.abs(diff);

    if (absDiff <= treshold) {
      finishAnimation();

      return;
    }

    // How much time passed from last frame
    const timestampDiff = lastFrameTime
      ? timestamp - lastFrameTime
      : TARGET_FRAME_STEP_SIZE;
    const timeScale = timestampDiff / TARGET_FRAME_STEP_SIZE;
    // How many frames we need to reach target value
    const targetHits = (absDiff / distanceFactor + SLOW_DOWN_FACTOR) / 2;
    // How fast we should move to reach target value in target hits
    const targetSpeed = diff / targetHits;
    // Adjust animation speed to target speed
    const newAnimationSpeed = (animationSpeed + targetSpeed) / 2;
    // How much we should move value in this frame
    const shift = (newAnimationSpeed + newAnimationSpeed * timeScale) / 2;

    // If we jump to other side of target value in this shift
    if (Math.abs(shift) >= absDiff) {
      finishAnimation();

      return;
    }

    const newValue = activeValue + shift;
    lastFrameTime = timestamp;
    animationSpeed = newAnimationSpeed;

    updateValue(newValue);

    requestFrame(animate);
  };

  const move = (
    value: number,
    newDistanceFactor: number,
    startAnimationSpeed?: number
  ) => {
    if (destroyed) {
      return;
    }

    if (targetValue === value) {
      return;
    }

    targetValue = value;
    distanceFactor = newDistanceFactor;
    treshold = newDistanceFactor / 500;

    if (startAnimationSpeed && animationSpeed === 0) {
      animationSpeed = startAnimationSpeed;
    }

    if (!active) {
      active = true;

      requestFrame(animate);
    }
  };

  const destroy = () => {
    destroyed = true;
  };

  return { move, set, destroy };
}
