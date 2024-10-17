import { CALL_STATUS, useVapi } from "./useVapi";
import { Loader2, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const VapiButton = ({
  toggleCall,
  callStatus,
  audioLevel = 0,
}: Partial<ReturnType<typeof useVapi>>) => {
  const getButtonStyles = () => {
    switch (callStatus) {
      case CALL_STATUS.ACTIVE:
        return "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600";
      case CALL_STATUS.LOADING:
        return "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600";
      default:
        return "bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600";
    }
  };

  const getIconColor = () => {
    return callStatus === CALL_STATUS.ACTIVE ? "text-red-100" : "text-emerald-100";
  };

  return (
    <Button
      className={`${getButtonStyles()} text-white rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105`}
      style={{
        boxShadow: `0 0 ${15 + audioLevel * 50}px ${audioLevel * 15}px rgba(0, 0, 0, 0.3)`,
      }}
      onClick={toggleCall}
    >
      {callStatus === CALL_STATUS.ACTIVE ? (
        <Square className={`h-8 w-8 ${getIconColor()}`} />
      ) : callStatus === CALL_STATUS.LOADING ? (
        <Loader2 className={`h-8 w-8 animate-spin ${getIconColor()}`} />
      ) : (
        <Mic className={`h-8 w-8 ${getIconColor()}`} />
      )}
    </Button>
  );
};

export { VapiButton };
