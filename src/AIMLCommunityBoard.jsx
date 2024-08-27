import { useState } from "react";
import { Calendar, Clock, MapPin, Link, Search } from "lucide-react";
import { events } from "./eventData";
import PropTypes from 'prop-types';

const AIMLCommunityBoard = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || event.tags.includes(selectedTag))
  );

  const allTags = [...new Set(events.flatMap((event) => event.tags))];

  return (
    <div className="p-4 min-h-screen">
      <h1>{title}</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-64 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <select
          className="w-full md:w-auto px-4 py-2 border rounded-lg"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
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
                style={{ backgroundColor: "#7D038D" }}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white"
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
