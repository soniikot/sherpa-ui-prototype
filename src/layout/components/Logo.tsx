import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="flex items-center justify-center border-b border-app-border p-4 md:justify-start md:p-8">
      <Link
        to="/"
        className="flex items-center space-x-4 transition-opacity hover:opacity-80"
        aria-label="Go to Tenant Lifecycle Console"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="7SG logo"
          className="h-10 w-10 rounded-full md:h-12 md:w-12"
        />
        <div className="hidden md:block">
          <h1 className="text-xl leading-tight font-bold text-app-text">7SG</h1>
          <p className="text-xs font-medium text-app-text-muted">
            Hybrid AI Platform
          </p>
        </div>
      </Link>
    </div>
  );
}
