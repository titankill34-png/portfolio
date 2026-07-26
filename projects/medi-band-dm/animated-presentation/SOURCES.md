# Sources and claim audit

## Primary statistics source

1. International Diabetes Federation. **IDF Diabetes Atlas, 11th edition (2025)**. The edition was published in 2025 / พ.ศ. 2568 and presents 2024 estimates. It reports approximately 589 million adults aged 20–79 living with diabetes globally, about 1 in 9.
   https://diabetesatlas.org/media/uploads/sites/3/2025/04/IDF_Atlas_11th_Edition_2025-1.pdf

2. International Diabetes Federation. **Diabetes facts & figures**. Official summary of the 2025 Atlas and its 2024 global estimate.
   https://idf.org/about-diabetes/diabetes-facts-figures/

3. IDF Diabetes Atlas. **Thailand country profile**. The 2024 estimate reports 6,360.8 thousand adults aged 20–79 living with diabetes and approximately 33.3% undiagnosed. The deck rounds 6,360.8 thousand to 6.36 million.
   https://diabetesatlas.org/data-by-location/country/thailand/

4. International Diabetes Federation. **IDF Diabetes Atlas 11th Edition 2025 resource page**. Official edition metadata.
   https://idf.org/news-and-resources/resources/idf-diabetes-atlas-11th-edition-2025/

## Exact wording audit for slide 4

- Atlas edition: published in 2025 / พ.ศ. 2568.
- Global figure: 2024 estimate of approximately 589 million adults aged 20–79.
- Proportion: about 1 in 9 adults aged 20–79.
- Thailand: approximately 6.36 million adults aged 20–79.
- Thailand undiagnosed: approximately 33.3%.
- The deck explicitly states that Thailand figures are 2024 estimates published in the 2025 / 2568 Atlas.

The presentation does not state a medication-adherence percentage, fabricated survey result, or unsupported geofence function.

## Repository product source

The content and boundaries are traceable to the repository report at `projects/medi-band-dm/MEDI_BAND_DM_Report_TH.md` on branch `project/medi-band-dm-report` and the earlier presentation source. That report supports:

- visual and haptic reminders;
- three user responses;
- offline event recording and later sync;
- consent-based caregiver connection;
- reports for discussion with a health team;
- proposed battery/connectivity handling;
- evaluation of reminder reliability, timing, battery, usability, and event logs.

## Safety and target-user audit

- Primary target: people with diabetes taking medication or using insulin according to a clinician-approved treatment plan. The deck does not restrict use to older adults.
- A consent-authorized caregiver may receive agreed information.
- A clinician, nurse, or pharmacist may use reports as discussion support.
- An authorized helper may assist setup.
- The concept does not diagnose disease, calculate insulin doses, or automatically adjust medication.
- Missed-dose guidance must come from a doctor or pharmacist.
- `รับประทานแล้ว` is user self-confirmation, not proof of ingestion.
- No claim is made for HbA1c improvement, greater than 90% adherence, hospitalization reduction, or clinical effectiveness.

## Visual provenance and exact-product usage

- `assets/smart-pill-band-master-reference-v3.webp` — approved master reference committed for Issue #59; preserved and used directly.
- Slide 1: full master hero.
- Slide 8: approved watch/system crop.
- Slide 9: four purposeful direct crops for reminder screen, haptic/visual concept, perforated strap/response control, and conceptual pill compartment.
- Slide 15: full master closing shot.
- Slide 10 app states are original HTML/CSS matched to the master’s blue controls, white clinical surfaces, medication schedule, rounded panels, and clean spacing.

No previous fallback product image is referenced or included in the distributable ZIP. No external brand assets, web fonts, CDN resources, or runtime network requests are used.

## Team-data limitation

No verified member names or role assignments were found in the repository report or project presentation files. Slide 2 uses clearly labeled editable neutral placeholders. These must be replaced with verified details before classroom delivery.
