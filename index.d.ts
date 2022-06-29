type Parser =
  | ((data: any) => any)
  | {
      onData: (data: any) => any;
      onDone?: () => void;
    };

interface Manifest {
  src: string;
  type?: "text" | "binary" | "image" | "video" | "audio";
  parser?: Parser;
  stream?: boolean;
  credentials?: boolean;
}

declare var resl: (args: {
  manifest: Record<string, Manifest>;
  onDone: (assets: Record<string, any>) => void;
  onProgress?: (progress: number, message: any) => void;
  onError?: (error: Error) => void;
}) => void;

export default resl;
