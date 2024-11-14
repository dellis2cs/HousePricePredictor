import { useState } from "react";

const Form = () => {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to manage form data
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    mainroad: "",
    guestroom: "",
    basement: "",
    hotwaterheating: "",
    airconditioning: "",
    parking: "",
    prefarea: "",
    furnishingstatus: "",
  });
  // State to manage prediction result
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle the 'Predict House Price' button click
  const handlePredictClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowSpan(false);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.Prediction);
      setShowSpan(true);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error occurred while predicting price");
      setShowSpan(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="text-center">House Price Prediction</h1>
      <form onSubmit={handlePredictClick}>
        <label>Area (sq ft):</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Enter area in sq ft"
        />

        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Enter number of bedrooms"
        />

        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Enter number of bathrooms"
        />

        <label>Stories:</label>
        <input
          type="number"
          name="stories"
          value={formData.stories}
          onChange={handleChange}
          placeholder="Enter number of stories"
        />

        <label>Main Road Access:</label>
        <select
          name="mainroad"
          value={formData.mainroad}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Guest Room:</label>
        <select
          name="guestroom"
          value={formData.guestroom}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Basement:</label>
        <select
          name="basement"
          value={formData.basement}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Hot Water Heating:</label>
        <select
          name="hotwaterheating"
          value={formData.hotwaterheating}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Air Conditioning:</label>
        <select
          name="airconditioning"
          value={formData.airconditioning}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Parking Spaces:</label>
        <input
          type="number"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
          placeholder="Enter number of parking spaces"
        />

        <label>Preferred Area:</label>
        <select
          name="prefarea"
          value={formData.prefarea}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Furnishing Status:</label>
        <select
          name="furnishingstatus"
          value={formData.furnishingstatus}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="0">Furnished</option>
          <option value="1">Semi-Furnished</option>
          <option value="2">Unfurnished</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Predicting..." : "Predict House Price"}
        </button>
      </form>

      {showSpan && (
        <div className="text-center mt-3">
          <h4>The Predicted Price is ${result}</h4>
        </div>
      )}
    </div>
  );
};

export default Form;
