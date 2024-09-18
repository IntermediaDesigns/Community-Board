import { useState } from "react";
import PropTypes from "prop-types";
import { Calendar, Clock, MapPin, Link, Search, X } from "lucide-react";
import { events } from "../eventData";

const AIMLCommunityBoard = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => event.tags.includes(tag));
    const eventDate = new Date(event.date);
    const matchesDateRange =
      (!startDate || eventDate >= new Date(startDate)) &&
      (!endDate || eventDate <= new Date(endDate));
    return matchesSearch && matchesTags && matchesDateRange;
  });

  const allTags = [...new Set(events.flatMap((event) => event.tags))];

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center">{title}</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-64 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 rounded-lg"
            style={{ border: "1px solid #C470D4" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <h2 className="text-purple-300 mb-2 lg:mb-0 lg:mr-4">
            Search by Date
          </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <input
              type="date"
              className="px-4 py-2 border rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="px-4 py-2 border rounded-lg"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={clearDates}
              className="px-4 py-2 bg-purple-700 text-gray-200 rounded-lg hover:bg-purple-400 transition-colors duration-200 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Dates
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-purple-300 mb-2 text-center">Filter by Category</h2>
      <div className="mb-4 mt-4 flex flex-wrap items-center justify-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagChange(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
              selectedTags.includes(tag)
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-800 hover:bg-purple-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div
              style={{ backgroundColor: "#7D038D" }}
              className="text-white py-4 px-6"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex flex-wrap mt-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white"
                style={{
                  backgroundColor: "#7D038D",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#d34ee5")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#7D038D")
                }
              >
                <Link className="w-5 h-5 mr-2" />
                More Info
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AIMLCommunityBoard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AIMLCommunityBoard;
