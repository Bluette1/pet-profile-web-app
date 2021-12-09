import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import PetService from "../services/pet.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

const PetForm = (props) => {
  const form = useRef();
  const location = useLocation();
  const { pet } = location.state;
  const checkBtn = useRef();
  const [name, setName] = useState(pet.name);
  const [age, setAge] = useState(pet.age);
  const [sex, setSex] = useState(pet.sex);
  const [missing, setMissing] = useState(pet.missing);
  const [weight, setWeight] = useState(pet.weight);
  const [color, setColor] = useState(pet.color);
  const [image, setImage] = useState(pet.image);
  const [availableForAdoption, setAvailableForAdoption] = useState(pet.available_for_adoption);
  const { message } = useSelector((state) => state.message);
  const [imageSelected, setImageSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeMissing = () => {
    setMissing((missingValue) => !missingValue);
  };

  const onChangeAvailableForAdoption= () => {
    setAvailableForAdoption((available) => !available);
  };

  const onChangeAge = (e) => {
    const age = e.target.value;
    setAge(age);
  };

  const onChangeColor = (e) => {
    const color = e.target.value;
    setColor(color);
  };

  const onChangeWeight = (e) => {
    const weight = e.target.value;
    setWeight(weight);
  };

  const onChangeSex = (e) => {
    const sex = e.target.value;
    setSex(sex);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      //Use form data to post data
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);
      formData.append("age", age);
      formData.append("sex", sex);
      formData.append("weight", weight);
      formData.append("color", color);
      formData.append("missing", missing);

      const res = await PetService.updatePet(pet._id, formData);
      if (res.status !== 200 || !res) {
        setLoading(false);
      } else {
        props.history.push("/");
        window.location.reload();
      }
    } else {
      setLoading(false);
    }
  };

  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    setImageSelected(true);
  };

  const sexes = ["M", "F"];

  return (
    <div className="col-md-12" data-testid="PetForm-container">
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="form-group">
          <p>name</p>
          <Input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChangeName}
          />
        </div>

        <div className="form-group">
          <p>Missing? {missing ? 'Yes' : 'No'}</p>
          <Input
            type="checkbox"
            checked={missing}
            onChange={onChangeMissing}
          />
        </div>

        <div className="form-group">
          <p>age</p>
          <Input
            type="number"
            className="form-control"
            name="age"
            value={age}
            onChange={onChangeAge}
          />
        </div>

        <div className="form-group">
          <p>weight</p>
          <Input
            type="number"
            className="form-control"
            name="weight"
            value={weight}
            onChange={onChangeWeight}
          />
        </div>

        <div className="form-group">
          <p>color</p>
          <Input
            type="text"
            className="form-control"
            name="color"
            value={color}
            onChange={onChangeColor}
          />
        </div>

        <div className="form-group">
          <p>Available for adoption? {missing ? 'Yes' : 'No'}</p>
          <Input
            type="checkbox"
            checked={availableForAdoption}
            onChange={onChangeAvailableForAdoption}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-select">
            Choose sex:
            <Select
              name="sexes-select"
              id="sexes-select"
              onChange={onChangeSex}
            >
              <option value={sex}>{sex}</option>
              {sexes.map((item) => (
                <option value={item} key={`sex-${uuid()}`}>
                  {item}
                </option>
              ))}
            </Select>
          </label>
        </div>

        <div className="form-group">
          <input type="file" name="image" onChange={handleChangeImage} />{" "}
          {imageSelected ? (
            <span>
              <p>
                Filename:
                {image.name}
              </p>
              <p>
                Filetype:
                {image.type}
              </p>
              <p>
                Size in bytes:
                {image.size}
              </p>
              <p>
                lastModifiedDate:
                {image.lastModifiedDate.toLocaleDateString()}
              </p>
            </span>
          ) : (
            <p>Select an image file</p>
          )}
        </div>
        <div className="form-group ">
          <button
            className="btn btn-primary btn-block"
            disabled={loading}
            type="submit"
            data-testid="submit-btn"
          >
            {loading && <span className="spinner-border spinner-border-sm" />}
            <span>Update Pet</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

PetForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PetForm;
