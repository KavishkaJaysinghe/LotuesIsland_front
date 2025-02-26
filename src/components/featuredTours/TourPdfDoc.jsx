/* eslint-disable react/prop-types */

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2 solid #E5E7EB',
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
    color: '#4B5563',
    lineHeight: 1.4,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#374151',
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 20,
  },
  infoItem: {
    flex: 1,
  },
  bookingSection: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bookingItem: {
    width: '48%',
  },
  descriptionSection: {
    marginBottom: 12,
  },
  timelineSection: {
    marginTop: 12,
    flex: 1,
  },
  timelineDayWrapper: {
    marginBottom: 20, // Consistent spacing between days
  },
  timelineItem: {
    paddingLeft: 15,
    borderLeft: '2 solid #3B82F6',
    paddingBottom: 15, // Add padding at the bottom of each timeline item
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563EB',
  },
  timelineSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 5,
  },
  activityList: {
    marginLeft: 10,
  },
  activityItem: {
    fontSize: 11,
    marginBottom: 3,
    color: '#4B5563',
  },
  noActivities: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  pageFooter: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 10,
    paddingTop: 8,
    borderTop: '1 solid #E5E7EB',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 40, // Add space for footer
  },
});

const TourPDFDocument = ({ tour, destinationList, bookingData }) => {
  const { title, days, destinations, desc } = tour || {};

  const idStrings = Array.isArray(destinations)
    ? destinations.map((item) => item._id)
    : [];

  const filteredDestinations = idStrings
    .map((id) => destinationList.find((dest) => dest._id === id))
    .filter(Boolean);

  const timelineDestinations =
    filteredDestinations.length > 0 ? filteredDestinations : destinationList || [];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Group destinations into pages (3 destinations per page)
  const destinationsPerPage = 3;
  const groupedDestinations = timelineDestinations.reduce((acc, dest, i) => {
    const pageIndex = Math.floor(i / destinationsPerPage);
    if (!acc[pageIndex]) acc[pageIndex] = [];
    acc[pageIndex].push(dest);
    return acc;
  }, []);

  const renderTimelineDay = (destination, index, totalDestinations, isLastOnPage) => {
    const travelRoute = index === 0
      ? `Airport → ${destination.destinationName}`
      : index === totalDestinations - 1
      ? `${destination.destinationName} → Airport`
      : `${timelineDestinations[index - 1].destinationName} → ${destination.destinationName}`;

    return (
      <View 
        key={destination._id} 
        style={[
          styles.timelineDayWrapper,
          // Remove margin bottom for last item on the page
          isLastOnPage && { marginBottom: 0 }
        ]}
      >
        <View style={styles.timelineItem}>
          <Text style={styles.timelineTitle}>
            Day {index + 1} - {travelRoute}
          </Text>
          <Text style={styles.timelineSubtitle}>
            Activities in {destination.destinationName}
          </Text>
          <View style={styles.activityList}>
            {destination.activities && destination.activities.length > 0 ? (
              destination.activities.map((activity, idx) => (
                <Text key={idx} style={styles.activityItem}>
                  • {activity}
                </Text>
              ))
            ) : (
              <Text style={styles.noActivities}>
                Activities to be confirmed
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Document>
      {/* First page with header info */}
      <Page size="A4" style={styles.page}>
        {/* Title and Basic Info Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Duration: </Text>
                {days} Days
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Destinations: </Text>
                {destinations?.length || 0} locations
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Details Section */}
        {bookingData && (
          <View style={styles.bookingSection}>
            <Text style={styles.subtitle}>Booking Details</Text>
            <View style={styles.bookingGrid}>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Guest Name: </Text>
                  {bookingData.fullName}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Email: </Text>
                  {bookingData.email}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Contact: </Text>
                  {bookingData.phone}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Travel Date: </Text>
                  {formatDate(bookingData.bookAt)}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Group Size: </Text>
                  {bookingData.guestSize} persons
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Transport: </Text>
                  {bookingData.vehicleType} (x{bookingData.vehicles})
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Accommodation: </Text>
                  {bookingData.accommodationType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Rooms: </Text>
                  {bookingData.bedrooms} bedroom(s)
                </Text>
              </View>


            </View>
            {bookingData.preferences && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.boldText}>Special Requests:</Text>
                <Text style={styles.text}>{bookingData.preferences}</Text>
              </View>
            )}
          </View>
        )}

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.subtitle}>Tour Description</Text>
          <Text style={styles.text}>{desc}</Text>
        </View>

        {/* First page timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.subtitle}>Travel Itinerary</Text>
          <View style={styles.timelineContent}>
            {groupedDestinations[0]?.map((destination, i) => 
              renderTimelineDay(
                destination, 
                i, 
                timelineDestinations.length,
                i === groupedDestinations[0].length - 1
              )
            )}
          </View>
        </View>

        <View style={styles.pageFooter}>
          <Text>Document generated on {formatDate(new Date().toISOString())}</Text>
        </View>
      </Page>

      {/* Additional pages for remaining timeline items */}
      {groupedDestinations.slice(1).map((pageDestinations, pageIndex) => (
        <Page key={pageIndex + 1} size="A4" style={styles.page}>
          <View style={styles.timelineSection}>
            <View style={styles.timelineContent}>
              {pageDestinations.map((destination, i) => 
                renderTimelineDay(
                  destination,
                  (pageIndex + 1) * destinationsPerPage + i,
                  timelineDestinations.length,
                  i === pageDestinations.length - 1
                )
              )}
            </View>
          </View>
          <View style={styles.pageFooter}>
            <Text>Document generated on {formatDate(new Date().toISOString())}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default TourPDFDocument;