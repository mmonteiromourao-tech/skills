# Google Ads Metrics Glossary

Reference for all metrics available in Google Ads reports.

---

## Core Performance Metrics

### Impressions
Number of times an ad was shown. Does not imply the user saw or clicked the ad.
- Low impressions → keyword volume too low, bids too low, or ad disapproved

### Clicks
Number of times users clicked the ad.

### CTR (Click-Through Rate)
`Clicks / Impressions × 100`
Measures how compelling the ad is relative to search intent.
- Search avg: 2–5% (varies by industry)
- Display avg: 0.05–0.5%

### Impressions (Abs. Top) %
Percentage of impressions shown as the very first ad above organic results.

### Impressions (Top) %
Percentage of impressions shown anywhere above organic results.

---

## Cost Metrics

### Cost
Total amount spent in the selected period.

### Avg. CPC (Cost Per Click)
`Cost / Clicks`
Average amount paid per click. Influenced by bid, Quality Score, and competition.

### Avg. CPM (Cost Per Thousand Impressions)
Used primarily for Display and video campaigns.
`Cost / Impressions × 1000`

---

## Conversion Metrics

### Conversions
Number of tracked conversion actions (purchases, leads, calls, form fills, etc.).
Important: one click can generate multiple conversions.

### Conv. Rate (Conversion Rate / CVR)
`Conversions / Clicks × 100`
Percentage of clicks that result in a conversion.
- Search avg: 2–5% (varies widely by industry and offer)

### Cost / Conv. (CPA — Cost Per Acquisition / Cost Per Lead)
`Cost / Conversions`
How much each conversion costs on average.

### Conv. Value
Total monetary value of conversions (requires value tracking setup).

### ROAS (Return on Ad Spend)
`Conv. Value / Cost`
Revenue generated per dollar spent. ROAS of 4 = $4 revenue per $1 spent.
- Break-even ROAS depends on margins. E-commerce typically targets 3–8x.

### All Conv.
Includes all conversion actions including cross-device and view-through conversions.

---

## Quality Metrics

### Quality Score (QS)
Google's 1–10 rating for each keyword. Composed of:
- **Expected CTR**: Likelihood of click relative to similar ads
- **Ad Relevance**: How closely the ad matches search intent
- **Landing Page Experience**: Relevance, transparency, and load speed of landing page

QS directly affects Ad Rank and CPC:
- QS 10 = lowest possible CPC for given position
- QS 1–4 = high CPC, limited delivery, or suspension

### Ad Strength (RSA)
Qualitative rating for Responsive Search Ads: Poor / Average / Good / Excellent.
Influenced by headline/description variety, keyword inclusion, and length.

---

## Auction and Competitive Metrics

### Impression Share (IS)
`Impressions received / Total eligible impressions`
Shows how often ads showed vs. how often they were eligible.

### IS Lost (Budget)
Percentage of eligible impressions lost because the daily budget ran out.
- Fix: Increase daily budget or reduce bids/targeting.

### IS Lost (Rank)
Percentage of eligible impressions lost due to low Ad Rank (bids or Quality Score).
- Fix: Raise bids, improve Quality Score, or tighten targeting.

### Search Overlap Rate
How often a competitor's ad showed alongside yours.

### Outranking Share
How often your ad ranked higher than a competitor's ad.

---

## Bidding and Targeting

### Avg. Position
Deprecated since 2019. Use Impression (Top) % and Impression (Abs. Top) % instead.

### Search Exact Match IS
Impression share for searches that exactly match your keyword (no close variants).
Low value = significant close variant traffic.

### Bid
The maximum CPC set manually, or the target set for Smart Bidding strategies.

### Bid Strategy
- **Manual CPC**: Full bid control, no automation
- **Enhanced CPC (ECPC)**: Manual bids with automated adjustments
- **Target CPA**: Google adjusts bids to hit a target cost per conversion
- **Target ROAS**: Google adjusts bids to hit a target return on ad spend
- **Maximize Conversions**: Spends full budget to get as many conversions as possible
- **Maximize Conversion Value**: Spends full budget to maximize total value
- **Target Impression Share**: Bids to achieve a target IS at top or absolute top position

---

## Search Terms Report Metrics

### Search Term
The actual query a user typed that triggered the ad. Different from the keyword.

### Match Type (triggered)
- **Exact**: Query matches keyword exactly (with close variants)
- **Phrase**: Query contains keyword phrase (with close variants)
- **Broad**: Query is loosely related to keyword

### Added / Excluded
Whether the search term was added as a keyword or excluded as a negative.

---

## Account Structure Terms

### Campaign
Top-level container. Controls budget, campaign type, bidding strategy, and targeting (location, language, schedule).

### Ad Group
Contains keywords and ads. Defines the theme connecting keywords and ads. Budget is set at campaign level.

### Keyword
The word or phrase that triggers the ad. Has a match type (Broad, Phrase, Exact).

### Negative Keyword
A keyword that prevents the ad from showing. Applied at ad group or campaign level.

### Ad (Responsive Search Ad / RSA)
The actual ad unit. For RSA: up to 15 headlines and 4 descriptions. Google assembles combinations.

### Extensions (Assets)
Additional information appended to ads: sitelinks, callouts, structured snippets, call extensions, lead forms, etc.

---

## Calculated / Derived Metrics

| Metric | Formula | Use |
|---|---|---|
| CTR | Clicks / Impressions × 100 | Ad appeal |
| CVR | Conversions / Clicks × 100 | Landing page / offer quality |
| CPA | Cost / Conversions | Efficiency |
| ROAS | Conv. Value / Cost | Revenue efficiency |
| CPM | Cost / Impressions × 1000 | Awareness cost |
| Revenue per Click | Conv. Value / Clicks | Value of traffic |
| Wasted Spend | Cost of keywords with 0 conversions | Budget waste |
