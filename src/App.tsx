import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
import { CharacterPreview } from "./features/Character";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const scrollAreaRef = useRef<any>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };
  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  });

  useEffect(() => {
    const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4338ca');
      gradient.addColorStop(1, '#3b82f6');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">
                    Character Designer
                  </span>
                </a>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <nav className="flex items-center">
                  <DarkModeToggle />
                </nav>
              </div>
            </div>
          </header>
          <div className="flex-1">
            <main className="relative z-10 flex h-[calc(100vh-3.5rem)] bg-transparent p-4">
              <Card className="w-96 mr-4">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-center">Character Details</h2>
                </CardHeader>
                <CardContent>
                  <CharacterPreview />
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col">
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    <div 
                      ref={viewportRef} 
                      className="flex flex-1 flex-col min-h-[calc(100vh-10rem)] justify-end p-4"
                    >
                      <MessageList
                        messages={messages}
                        activeTranscript={activeTranscript}
                      />
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-center py-4">
                  <VapiButton
                    audioLevel={audioLevel}
                    callStatus={callStatus}
                    toggleCall={toggleCall}
                  />
                </CardFooter>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
