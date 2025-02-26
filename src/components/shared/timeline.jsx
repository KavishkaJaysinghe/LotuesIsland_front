import React from 'react';
import { Timeline } from "flowbite-react";

const TimelineComponent = ({ dest_ids, dest_obj }) => {
  // Extract just the ID strings from the dest_ids objects
  const idStrings = React.useMemo(() => {
    return Array.isArray(dest_ids) 
      ? dest_ids.map(item => item._id)
      : [];
  }, [dest_ids]);

  // Filter destinations based on extracted IDs
  const filteredDestinations = React.useMemo(() => {
    if (!idStrings || idStrings.length === 0) return [];
    
    return idStrings.map(id => 
      dest_obj.find(dest => dest._id === id)
    ).filter(Boolean);
  }, [idStrings, dest_obj]);

  // Use filtered destinations if dest_ids is provided, otherwise use all destinations
  const destinations = filteredDestinations.length > 0 ? filteredDestinations : dest_obj || [];
  const days = destinations.length;

  if (days <= 0) return (
    <div className="w-full flex justify-center">
      <p className="text-center text-gray-500">No itinerary available.</p>
    </div>
  );

  return (
    <div id="Third-Row-Timeline-Activities" className="mb-8 flex justify-center">
      <div className="w-4/5">
        <Timeline>
          {destinations.map((destination, i) => {
            let travelRoute = "";
            
            if (i === 0) {
              travelRoute = `Airport → ${destination.destinationName}`;
            } else if (i === days - 1) {
              travelRoute = `${destination.destinationName} → Airport`;
            } else {
              travelRoute = `${destinations[i - 1].destinationName} → ${destination.destinationName}`;
            }

            return (
              <Timeline.Item key={destination._id}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>
                    <strong>Day {i + 1} - {travelRoute}</strong>
                  </Timeline.Time>
                  <Timeline.Title>Activities for {destination.destinationName}</Timeline.Title>
                  <Timeline.Body>
                    {destination.activities && destination.activities.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700">
                        {destination.activities.map((activity, index) => (
                          <li key={`${destination._id}-activity-${index}`}>{activity}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No activities listed for this day.</p>
                    )}
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default TimelineComponent;