declare module "lucide-react" {
  import { FC, SVGProps } from "react";

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  type Icon = FC<IconProps>;

  export const Trophy: Icon;
  export const Medal: Icon;
  export const Award: Icon;
  export const Target: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Search: Icon;
  export const Play: Icon;
  export const ExternalLink: Icon;
  export const Loader2: Icon;
  export const MapPin: Icon;
  export const Calendar: Icon;
  export const Users: Icon;
  export const Inbox: Icon;
  export const Snowflake: Icon;
  export const Globe: Icon;
  export const BarChart3: Icon;
}
