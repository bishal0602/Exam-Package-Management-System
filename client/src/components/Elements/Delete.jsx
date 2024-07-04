import React, { useEffect, useState } from "react";

export default function Delete(props) {
  const type = props.match.params.type;
  const id = props.match.params.id;
  const [deleted, setDeleted] = useState(false);
  const [fetched, setFetched] = useState(false);

  console.log(type, id);
  useEffect(() => {
    const confirmData = window.confirm(
      `Are you sure you want to delete ${type} with id ${id}?`
    );

    if (confirmData) {
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(`/API/query/${type}/${id}`, {
        method: "delete",
        signal,
      })
        .then((res) => {
          if (res.ok) {
            setDeleted(true);
            setFetched(true);
          }
        })
        .catch(console.err);
      setFetched(true);
      return () => {
        controller.abort();
      };
    }
  }, [type, id]);

  return (
    <div>
      {fetched && (
        <p>
          {deleted ? (
            <p>Your {type} has been deleted.</p>
          ) : (
            <p>Cannot delete your {type} because it has associated data.</p>
          )}
        </p>
      )}
      <p>
        <a href="#" onClick={() => window.history.back()}>
          Go back
        </a>
      </p>
    </div>
  );
}
