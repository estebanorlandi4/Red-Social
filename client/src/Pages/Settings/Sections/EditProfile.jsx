import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

import styles from "./EditProfile.module.css";
import { updateUser } from "../../../Redux/actions/Session";

function EditProfile(props) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer);
  const allTags = useSelector((state) => state.postsReducer.tags);

  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    about: "",
    tags: session.tags,
  });

  const [options, setOptions] = useState(
    allTags.map((tag) => ({ value: tag.label, label: tag.label }))
  );

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    gitaccount: "",
    about: "",
  });

  const handleTags = (options) => {
    setInputs((old) => ({ ...old, tags: options.map((tag) => tag.value) }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(session.username, inputs));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>User</h3>

      <ImageUpload />

      <div className={styles.inline}>
        <label>
          Nombre
          <div className="input-group">
            <input
              name="name"
              onChange={handleChange}
              placeholder={session.name || "Name"}
            />
          </div>
        </label>

        <label>
          Apellido
          <div className="input-group">
            <input
              name="lastname"
              onChange={handleChange}
              placeholder={session.lastname || "Last Name"}
            />
          </div>
        </label>
      </div>

      <label>
        GitHub
        <div className="input-group">
          <input
            name="gitaccount"
            onChange={handleChange}
            placeholder={session.gitaccount || "GitHub Account"}
          />
        </div>
      </label>

      <label>
        About
        <div className="input-group">
          <textarea
            name="about"
            onChange={handleChange}
            placeholder={session.about || "About"}
          />
        </div>
      </label>

      <label>
        Tags
        <Select
          options={options}
          name="tags"
          onChange={handleTags}
          placeholder="Tags"
          isMulti
        />
      </label>
      <button type="submit">Change</button>
    </form>
  );
}

export default EditProfile;