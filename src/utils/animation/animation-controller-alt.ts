type AnimationControllerOptions = {
  initialValue: number;
  onUpdate: (value: number) => void;
  speedFactor?: number;
  maxSpeed?: number;
  maxAcceleration?: number;
};
const accelRate = 0.5; // high acceleration when far from target
const decelRate = 0.3; // gentle deceleration near target

export function initAnimationControllerAlt({
  initialValue,
  onUpdate,
  speedFactor = 0.1,
  maxSpeed = 20,
  maxAcceleration = 0.5,
}: AnimationControllerOptions) {
  let currentValue = initialValue;
  let targetValue = initialValue;
  let animationSpeed = 0;
  let animationFrameId: number | null = null;

  const processFrame = () => {
    const delta = targetValue - currentValue;
    const distance = Math.abs(delta);
    const direction = Math.sign(delta);

    // If already at target and not moving, stop animation
    if (distance < 0.01 && Math.abs(animationSpeed) < 0.01) {
      currentValue = targetValue;
      animationSpeed = 0;
      onUpdate(currentValue);
      animationFrameId = null;
      return;
    }

    // Braking distance assuming constant deceleration
    const brakingDistance = (animationSpeed * animationSpeed) / (2 * decelRate);

    let acceleration: number;

    if (distance < brakingDistance) {
      // Smooth braking
      acceleration = -decelRate * Math.sign(animationSpeed);
    } else {
      // Fast acceleration
      acceleration = accelRate * direction;
    }

    // Avoid reversing without braking first
    if (Math.sign(animationSpeed) !== direction && animationSpeed !== 0) {
      acceleration = -decelRate * Math.sign(animationSpeed);
    }

    animationSpeed += acceleration;
    animationSpeed = Math.max(-maxSpeed, Math.min(animationSpeed, maxSpeed));

    // Update current value
    currentValue += animationSpeed;

    // Clamp to target if we would overshoot
    if (
      (direction > 0 && currentValue > targetValue) ||
      (direction < 0 && currentValue < targetValue)
    ) {
      currentValue = targetValue;
      animationSpeed = 0;
    }

    onUpdate(currentValue);

    animationFrameId = requestAnimationFrame(processFrame);
  };

  const setTarget = (value: number) => {
    targetValue = value;

    if (animationFrameId === null) {
      processFrame();
    }
  };

  return {
    setTarget,
  };
}
