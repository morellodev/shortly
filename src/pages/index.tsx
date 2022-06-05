import { GetServerSideProps, NextPage } from "next";

interface Props {
  slug?: string;
  status?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const props: Props = {};

  if (typeof context.query.slug === "string") {
    props.slug = context.query.slug;
  }

  if (typeof context.query.status === "string") {
    props.status = context.query.status;
  }

  return {
    props,
  };
};

const Home: NextPage<Props> = (props) => {
  const hasError = typeof props.status === "string";

  return (
    <main>
      <form method="get" action="/api/get-url">
        <input
          type="text"
          name="slug"
          aria-invalid={hasError}
          defaultValue={props.slug}
          placeholder="Slug"
          required
        />
        <button type="submit">Lookup and open URL</button>
      </form>
      {hasError && <p>Not found</p>}
    </main>
  );
};

export default Home;
