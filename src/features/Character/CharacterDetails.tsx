import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect, ChangeEvent } from "react";
import { vapi } from "../Assistant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CharacterDetails() {
  const [characterDetails, setCharacterDetails] = React.useState<
    Record<string, string>
  >({});

  const [editKey, setEditKey] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");

  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (message.type !== MessageTypeEnum.FUNCTION_CALL) return;
      if (message.functionCall.name === "finalizeDetail") {
        const params = message.functionCall.parameters;
        setCharacterDetails((details) => ({
          ...details,
          [params.key.toLowerCase()]: [params.value],
        }));
      }
    };

    vapi.on("message", onMessageUpdate);
    return () => {
      vapi.off("message", onMessageUpdate);
    };
  }, []);

  const handleEdit = (key: string) => {
    setEditKey(key);
    setEditValue(characterDetails[key]);
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleCancel = () => {
    setEditKey(null);
    setEditValue("");
  };

  const handleSave = () => {
    if (editKey) {
      vapi.send({
        type: MessageTypeEnum.ADD_MESSAGE,
        message: {
          role: "system",
          content: `The user has updated the final value for ${editKey} to ${editValue}.`,
        },
      });
    }
    setEditKey(null);
    setEditValue("");
  };
  return (
    <>
      {Object.keys(characterDetails).map((key: string) => (
        <div className="flex flex-row gap-2 justify-between w-full items-center" key={key}>
          <h3 className="font-semibold capitalize">{key}</h3>
          <div className="flex items-center">
            {editKey === key ? (
              <Input
                value={editValue}
                onChange={handleEditChange}
                className="h-8 w-40"
              />
            ) : (
              <div className="transition text-right w-40 truncate">
                {characterDetails[key]}
              </div>
            )}
            {editKey === key ? (
              <div className="flex ml-2">
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSave}>
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => handleEdit(key)}>
                <Pencil className="h-4 w-4 text-blue-500" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export { CharacterDetails };
