import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchForm({ setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    const searchTarget = e.target.name.value;
    setSearch(searchTarget);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="검색할 사용자의 이름을 입력하세요."
          style={{
            width: "300px",
            borderRight: "none",
            borderRadius: "0.25rem 0 0 0.25rem",
            float: "left",
          }}
          id="name"
        ></Form.Control>
        <Button
          style={{
            background: "none",
            borderColor: "#ced4da",
            borderLeft: "none",
            borderRadius: "0 0.25rem 0.25rem 0",
            display: "inline-block",
          }}
          type="submit"
        >
          <FaSearch style={{ color: "gray" }} />
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SearchForm;
