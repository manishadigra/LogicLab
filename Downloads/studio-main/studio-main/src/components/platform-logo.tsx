export function PlatformLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l7 4-7 4" />
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
    </svg>
  );
}
