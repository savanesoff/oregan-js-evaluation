import { useCallback, useMemo, useState, useEffect } from "react";
import { useDebounce } from "./debounce";

const CHAR_HIDE_DELAY = 600;

const createInputChar = (char, password, added = false) => ({
  key: Math.random(),
  value: char,
  password,
  added,
  hideDelay: CHAR_HIDE_DELAY,
});

export const useInputValue = (
  ref,
  value = "",
  password = false,
  readonly = false
) => {
  const [editMode, setEditMode] = useState(false);
  const [caretOffset, setCaretOffset] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  const [showPass, setShowPass] = useState(false);
  /**
   * Compute the characters to display for initial value only
   * all other ops are handled by the onKeyDownCapture handler
   */
  const chars = useMemo(
    () => value.split("").map((char) => createInputChar(char, password)),
    [value, password]
  );

  const [selectedCharIndex, setSelectedCharIndex] = useState(chars.length - 1);

  /**
   * Computes the offset of the caret in pixels from the left of the container to the right of the selected character
   * Using callback because we need to access the ref, we it'll be called after the component is mounted
   */
  const getCaretOffsetPx = useCallback(
    (selectedCharIndex) => {
      const selectedChar = chars[selectedCharIndex];

      if (!selectedChar || !ref.current) return 0;

      const element = ref.current?.childNodes[selectedCharIndex];

      if (!element) return 0;

      const offset = (element.offsetLeft || 0) + (element.offsetWidth || 0);
      return offset;
    },
    [chars, ref]
  );

  const updateCaretOffset = useCallback(
    (selectedCharIndex) => {
      const offset = getCaretOffsetPx(selectedCharIndex);
      setCaretOffset(offset);
    },
    [getCaretOffsetPx]
  );

  const debounce = useDebounce();

  useEffect(() => {
    updateCaretOffset(selectedCharIndex);
    if (password) {
      debounce(() => {
        updateCaretOffset(selectedCharIndex);
      }, CHAR_HIDE_DELAY + 1);
    }
  }, [updateCaretOffset, selectedCharIndex, password, debounce]);

  const onKeyDownCapture = useCallback(
    (e) => {
      if (readonly) return;
      setEditMode(true);
      if (e.key === "ArrowLeft") {
        const newSelectedCharOffset = Math.max(selectedCharIndex - 1, -1);
        setSelectedCharIndex(newSelectedCharOffset);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        const newSelectedCharOffset = Math.min(
          selectedCharIndex + 1,
          chars.length - 1
        );
        setSelectedCharIndex(newSelectedCharOffset);
        e.preventDefault();
      } // else if char is printable
      else if (e.key.length === 1) {
        chars.splice(
          selectedCharIndex + 1,
          0,
          createInputChar(e.key, password, true)
        );
        setSelectedCharIndex(selectedCharIndex + 1);
        e.preventDefault();
      } else if (e.key === "Backspace") {
        if (!chars.length || selectedCharIndex < 0) return;
        chars.splice(selectedCharIndex, 1);
        setSelectedCharIndex(Math.max(selectedCharIndex - 1, -1));
        e.preventDefault();
      }
    },
    [chars, password, readonly, selectedCharIndex]
  );

  const onKeyUpCapture = useCallback(
    (e) => {
      if (readonly) return;
      e.preventDefault();
      setEditMode(false);
    },
    [readonly]
  );

  useEffect(() => {
    setInputValue(chars.map((char) => char.value).join(""));
  }, [chars, chars?.length]);

  const setClickPosition = useCallback(
    (e) => {
      if (readonly || chars.length === 0) return;
      const clickX = e.clientX;
      const clickY = e.clientY;
      const element = document.elementFromPoint(clickX, clickY);
      // Get the index of the element as a child node
      const index = Array.prototype.indexOf.call(
        ref.current?.children,
        element
      );
      if (index === -1) {
        setSelectedCharIndex(chars.length - 1);
      } else {
        setSelectedCharIndex(index);
      }
    },
    [chars.length, ref, readonly]
  );

  return {
    inputValue,
    selectedCharIndex,
    setSelectedCharIndex,
    chars,
    onKeyDownCapture,
    onKeyUpCapture,
    editMode,
    caretOffset,
    toggleShowPass: () => setShowPass((s) => !s),
    showPass,
    setClickPosition,
  };
};
