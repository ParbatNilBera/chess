import { IoColorPalette } from "react-icons/io5";
import { useSettings } from "../../context/SettingsContext";
import { BOARD_PRESETS } from "../../constants/boardPresets";
import { Card } from "../ui/Card";

export const BoardCustomizer = () => {
  const { boardPresetId, setBoardPresetId } = useSettings();

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <IoColorPalette className="w-5 h-5 text-amber-500" />
        <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
          Board Colors
        </h2>
      </div>
      <p className="text-xs text-stone-500 mb-4">
        Your choice is saved automatically.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BOARD_PRESETS.map((preset) => {
          const selected = boardPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setBoardPresetId(preset.id)}
              className={`
                rounded-xl border p-2 text-left transition-all duration-200
                ${
                  selected
                    ? "border-amber-500 bg-amber-900/25 ring-1 ring-amber-500/50"
                    : "border-stone-700 bg-stone-800/30 hover:border-stone-600"
                }
              `}
            >
              <div className="grid grid-cols-4 grid-rows-4 gap-0 rounded-lg overflow-hidden mb-2 aspect-square">
                {Array.from({ length: 16 }).map((_, i) => {
                  const row = Math.floor(i / 4);
                  const col = i % 4;
                  const isDark = (row + col) % 2 === 1;
                  return (
                    <div
                      key={i}
                      className="w-full h-full"
                      style={{
                        backgroundColor: isDark
                          ? preset.darkSquare
                          : preset.lightSquare,
                      }}
                    />
                  );
                })}
              </div>
              <span
                className={`text-xs font-medium ${selected ? "text-amber-400" : "text-stone-400"}`}
              >
                {preset.name}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
