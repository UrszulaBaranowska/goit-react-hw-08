import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h2>Twoje kontakty</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Wyloguj
      </button>
      <SearchBox />
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
