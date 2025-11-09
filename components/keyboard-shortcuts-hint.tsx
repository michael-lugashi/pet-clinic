import Keyboard from "svg/Keyboard";

const KeyboardShortcutsHint = () => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-black/10 text-gray text-md">
        <Keyboard className="h-5 w-5" />
        <span>Keyboard shortcuts:</span>
        <kbd className="px-2 py-1 text-xs font-mono bg-light-purple border border-purple/20 rounded shadow-sm">?</kbd>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHint;
