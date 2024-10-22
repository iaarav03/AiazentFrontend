import React, { useState } from 'react';
import axios from 'axios';

const CreateAgentForm = () => {
  const [agentData, setAgentData] = useState({
    name: '',
    createdBy: '',
    websiteUrl: '',
    contactEmail: '',
    accessModel: '',
    pricingModel: '',
    category: '',
    industry: '',
    tagline: '',
    description: '',
    keyFeatures: '',
    useCases: '',
    tags: '',
    logo: null,
    thumbnail: null,
    videoUrl: '',
    price: '',
    individualPlan: '',
    enterprisePlan: '',
    freeTrial: false,
    subscriptionModel: '',
    refundPolicy: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAgentData({
      ...agentData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setAgentData({
      ...agentData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(agentData).forEach((key) => {
      formData.append(key, agentData[key]);
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/agents/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      alert('Agent created successfully!');
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Failed to create agent.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-lg">
      <h2 className="text-4xl font-bold text-center text-pink-500 mb-8">Create AI Agent</h2>

      <div className="space-y-6">
        {/* Input fields - one per line */}
        <div>
          <label className="block text-sm font-medium text-gray-400">AI Agent Name *</label>
          <input
            type="text"
            name="name"
            value={agentData.name}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter AI Agent name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Created By</label>
          <input
            type="text"
            name="createdBy"
            value={agentData.createdBy}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter creator name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Website URL *</label>
          <input
            type="text"
            name="websiteUrl"
            value={agentData.websiteUrl}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter website or GitHub URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={agentData.contactEmail}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Access Model *</label>
          <div className="mt-1 grid grid-cols-3 gap-4 text-gray-900">
            <label className="flex items-center">
              <input
                type="radio"
                name="accessModel"
                value="Open Source"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              Open Source
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="accessModel"
                value="Closed Source"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              Closed Source
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="accessModel"
                value="API"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              API
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Pricing Model *</label>
          <div className="mt-1 grid grid-cols-3 gap-4 text-gray-900">
            <label className="flex items-center">
              <input
                type="radio"
                name="pricingModel"
                value="Free"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              Free
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pricingModel"
                value="Freemium"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              Freemium
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pricingModel"
                value="Paid"
                onChange={handleChange}
                className="form-radio mr-2"
              />
              Paid
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Category *</label>
          <input
            type="text"
            name="category"
            value={agentData.category}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Industry *</label>
          <input
            type="text"
            name="industry"
            value={agentData.industry}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter industry"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Price *</label>
          <input
            type="text"
            name="price"
            value={agentData.price}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={agentData.tagline}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter tagline"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Description</label>
          <textarea
            name="description"
            value={agentData.description}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter description"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Free Trial</label>
          <input
            type="checkbox"
            name="freeTrial"
            checked={agentData.freeTrial}
            onChange={handleChange}
            className="mt-1 form-checkbox h-5 w-5 text-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Subscription Model</label>
          <input
            type="text"
            name="subscriptionModel"
            value={agentData.subscriptionModel}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter subscription model"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Refund Policy</label>
          <input
            type="text"
            name="refundPolicy"
            value={agentData.refundPolicy}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-600 bg-gray-100 rounded-lg text-gray-900"
            placeholder="Enter refund policy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Logo *</label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="mt-1 w-full text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="mt-1 w-full text-gray-900"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg"
        >
          Submit AI Agent
        </button>
      </div>
    </form>
  );
};

export default CreateAgentForm;
