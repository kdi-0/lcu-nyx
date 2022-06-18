export interface LCUDetails {
  port?: string;
  token?: string;
  running?: boolean;
}

export interface LCUHeader {
  hostname?: string;
  port?: LCUDetails["port"];
  path?: LCUDetails["token"];
  method?: string;
  headers?: object;
}
