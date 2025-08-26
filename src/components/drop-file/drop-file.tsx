import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./drop-file.module.css";
import { Button } from "components/button";
import FilePlus from "svg/file-plus.svg";
import { cn } from "utils/cn";

type DropFileProps = {
  className?: string;
  onSelectFile: (file: File) => void;
  disabled?: boolean;
};

const stop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

export function DropFile({ className, onSelectFile, disabled }: DropFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      stop(event);

      if (disabled) {
        return;
      }

      setIsDragging(false);

      const [file] = Array.from(event.dataTransfer.files);

      if (file) {
        onSelectFile(file);
      }
    },
    [onSelectFile, disabled]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      stop(event);

      if (disabled) {
        return;
      }

      event.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      stop(event);

      if (disabled) {
        return;
      }

      setIsDragging(false);
    },
    [disabled]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      const [file] = event.target.files ? Array.from(event.target.files) : [];

      if (file) {
        onSelectFile(file);
      }

      // allow reselecting the same file
      event.currentTarget.value = "";
    },
    [onSelectFile, disabled]
  );

  const openFileDialog = useCallback(() => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  }, [disabled]);

  return (
    <div
      className={cn(
        className,
        styles.dropFile,
        isDragging && styles.isDragging
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <FilePlus className={styles.fileIcon} />
      <div className={styles.caption}>Drop file here or select file</div>
      <Button onClick={openFileDialog}>Select file</Button>
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        multiple={false}
        onChange={onInputChange}
      />
    </div>
  );
}
