/**
 * Populate metrics with random data every 30 seconds for 24 hours.
 * When working locally you could load this data with SQL. But for cloud instances, you'll need this script.
 *
 * Usage:
 * node populate-metrics.js http://localhost:8055 your-access-token
 */

const { createDirectus, createItems, rest, staticToken, updateField } = require('@directus/sdk');

// Retrieve command line arguments
const args = process.argv.slice(2);
const directusUrl = args[0];
const accessToken = args[1];

if (!directusUrl || !accessToken) {
    console.error('Please provide both the Directus URL and the access token.');
    process.exit(1);
}

const directus = createDirectus(directusUrl).with(rest()).with(staticToken(accessToken));

// Function to update field settings
async function updateTimestampFieldSettings(setting) {
    try {
        await directus.request(updateField('status_metrics_data', 'timestamp', { meta: { special: setting }}));
    } catch (error) {
        console.error('Error updating timestamp field settings:', error);
        throw error; // Rethrow to handle in the calling function
    }
}

// Function to generate and insert data in batches
async function populateData(metricId, startingDate) {
    try {
        // Remove special setting for the timestamp field
        await updateTimestampFieldSettings(null);

        const dataPoints = 2880; // Number of data points for 24 hours
        const batchSize = 100; // Number of records per batch
        const startDate = new Date(startingDate);

        for (let i = 0; i < dataPoints; i += batchSize) {
            const batch = [];
            for (let j = 0; j < batchSize && i + j < dataPoints; j++) {
                const timestamp = new Date(startDate.getTime() + (i + j) * 30000); // 30-second intervals
                const value = Math.random() * (300 - 100) + 100; // Random value between 100 and 300 to simulate API response time

                batch.push({ timestamp, value, metric: metricId });
            }

            await directus.request(createItems('status_metrics_data', batch));
            console.log(`Batch ${Math.ceil(i / batchSize) + 1} inserted.`);
        }

        console.log('Data population complete.');
    } catch (error) {
        console.error('Error populating data:', error);
    } finally {
        // Restore the special setting for the timestamp field
        await updateTimestampFieldSettings(['date-created']);
    }
}

// Main execution
const metricId = '969845cf-543d-4bfa-a68e-12781e651807'; // Replace with actual metric ID
const startingDate = '2024-02-07T00:00:00.000Z'; // Replace with actual starting date

populateData(metricId, startingDate).catch(error => {
    console.error('Failed to populate data:', error);
});
