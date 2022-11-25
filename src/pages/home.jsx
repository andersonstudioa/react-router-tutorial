import { useEffect, useState } from "react";
import { 
  Outlet,
  NavLink,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Home() {
    
    const { contacts, q } = useLoaderData();
    const [query, setQuery] = useState(q);
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has(
        "q"
    );

    useEffect(() => {
      setQuery(q);
    }, [q]);
    //console.log(contacts);
    return (
      <>
        <div id="sidebar">
          <h2>
          <Link to={`/`}>
            <img src="/icons8-home-page-32.png"/>
          </Link>
          </h2>
          <h1>Criando rotas com React Route</h1>
            
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Pesquisar contatos"
                placeholder="Pesquisar"
                type="search"
                name="q"
                value={query ? query : ""}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">Novo</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>Sem nome</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Nenhum contato</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </>
    );
  }  