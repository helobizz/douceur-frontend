import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-bold">404</h2>

      <p className="text-muted-foreground">
        A página que você está procurando não foi encontrada.
      </p>

      <Link to="/" className="text-primary underline underline-offset-4">
        Voltar para o início
      </Link>
    </section>
  );
}

export default NotFound;
