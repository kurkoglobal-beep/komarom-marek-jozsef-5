export function Toast({ message }: { message: string }) { return <div className="ui-toast-region" aria-live="polite"><div className="ui-toast" role="status">{message}</div></div>; }
