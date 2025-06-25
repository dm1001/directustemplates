INSERT INTO status_metrics_data (id, timestamp, value, metric)
SELECT
    gen_random_uuid(),
    timestamp '2023-12-08 00:00:00.000+00' + interval '30 second' * series.number, -- Adjust the starting data and interval to your needs
    random() * (300 - 100) + 100, -- Random value between 100 and 300 to simulate API response time
    '969845cf-543d-4bfa-a68e-12781e651807' -- Metric ID (adjust to your metric ID)
FROM
    generate_series(1, 2880) AS series(number);
