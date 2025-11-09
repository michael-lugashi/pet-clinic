import Modal from "./modal";
import Button from "./button";

export type KeyboardShortcut = {
  key: string;
  description: string;
  category: string;
};

type KeyboardShortcutsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: KeyboardShortcut[];
};

const KeyboardShortcutsModal = ({ isOpen, onClose, shortcuts }: KeyboardShortcutsModalProps) => {
  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Keyboard Shortcuts</h2>
        <p className="text-gray mb-6">Navigate the clinic efficiently with your keyboard</p>

        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 text-purple">{category}</h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-black/5 last:border-b-0"
                  >
                    <span className="text-black/80">{shortcut.description}</span>
                    <kbd className="px-3 py-1.5 text-sm font-mono bg-light-purple border border-purple/20 rounded-md shadow-sm min-w-[60px] text-center">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-black/10">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default KeyboardShortcutsModal;
