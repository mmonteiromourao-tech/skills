---
name: google-ads-analysis
description: Analyze Google Ads campaigns, ad groups, keywords, and ads. Use this skill when the user mentions Google Ads, PPC campaigns, CTR, CPC, ROAS, Quality Score, ad spend, keyword bids, ad performance, campaign optimization, or wants to review, audit, or improve their Google Ads account. Triggers on requests like "analyze my campaigns", "why is my CPC high", "optimize my Google Ads", or any data export from Google Ads.
---

# Google Ads Campaign Analysis

Analyze Google Ads accounts at every level — campaign, ad group, keyword, and ad — to surface performance issues, identify opportunities, and deliver actionable recommendations.

## When This Skill Applies

Trigger on:
- User shares Google Ads data (CSV export, copied table, or pasted numbers)
- User asks about campaign performance, CTR, CPC, ROAS, Quality Score, or ad spend
- User wants to audit, optimize, or troubleshoot their Google Ads account
- User asks why ads are not converting, why CPC is high, or how to reduce wasted spend

## Workflow

Follow these five steps in order:

### Step 1 — Understand the Data

Ask the user what data they have available if not already provided:
- Google Ads CSV export (Campaigns, Ad Groups, Keywords, Ads, or Search Terms report)
- Copy-pasted table from the Google Ads interface
- Manual numbers provided in the message

Identify the time period, currency, and campaign type (Search, Display, Shopping, Performance Max).

### Step 2 — Validate and Structure the Data

Before analyzing:
- Confirm required columns are present (see Metrics Reference below)
- Check for data anomalies: zero impressions, missing costs, unrealistic CTRs
- Group data by hierarchy: Account → Campaign → Ad Group → Keyword → Ad

### Step 3 — Calculate Key Metrics

Compute derived metrics if not already present:

| Metric | Formula |
|---|---|
| CTR | Clicks / Impressions × 100 |
| CPC | Cost / Clicks |
| CVR (Conversion Rate) | Conversions / Clicks × 100 |
| CPL / CPA | Cost / Conversions |
| ROAS | Revenue / Cost |
| Impression Share Lost (Budget) | Provided by Google Ads |
| Impression Share Lost (Rank) | Provided by Google Ads |

### Step 4 — Identify Patterns and Problems

Evaluate each level of the hierarchy:

**Account level**
- Total spend vs. budget utilization
- Overall CVR and ROAS trend
- Impression share and lost IS reason

**Campaign level**
- Flag campaigns with spend but zero conversions (last 30 days)
- Flag campaigns with IS Lost (Budget) > 20% — consider budget increase
- Flag campaigns with IS Lost (Rank) > 30% — consider bid or Quality Score improvement

**Ad Group level**
- Flag ad groups with CTR < 1% (Search) or < 0.1% (Display)
- Flag ad groups with single keyword or single ad (SKAG risk)
- Flag ad groups mixing unrelated themes

**Keyword level**
- Sort by Cost descending, flag top spenders with zero conversions
- Flag keywords with Quality Score ≤ 4
- Flag Broad Match keywords consuming disproportionate budget
- Flag irrelevant search terms needing negatives

**Ad level**
- Compare CTR and CVR across ads within same ad group
- Flag ad groups with only one active ad (no A/B testing)
- Flag ads with low asset ratings in Responsive Search Ads (RSA)

### Step 5 — Generate the Report

Produce a structured markdown report using the template below. Be specific — include metric values, not just labels.

---

## Report Template

```markdown
# Google Ads Analysis — [Campaign Name or Account] — [Date Range]

## Executive Summary
- **Total Spend**: $X
- **Total Conversions**: X
- **Overall CPA**: $X
- **ROAS**: X.Xx
- **Key Finding**: [One sentence on the biggest opportunity or problem]

## Top Issues Found

### 🔴 Critical
1. [Issue] — [Campaign/Ad Group/Keyword] — [Metric values] — **Action**: [Specific fix]

### 🟡 Optimization Opportunities
1. [Issue] — [Metric values] — **Action**: [Specific fix]

### 🟢 What's Working
1. [Positive finding] — [Metric values]

## Keyword Analysis
| Keyword | Match Type | Impressions | Clicks | CTR | Cost | Conv | CPA | QS | Status |
|---|---|---|---|---|---|---|---|---|---|
| ... | | | | | | | | | |

## Recommendations (Priority Order)
1. **[Action]** — [Why] — Expected impact: [Metric] ↑/↓
2. ...

## Next Steps
- [ ] [Specific task with owner if known]
```

---

## Diagnostic Reference

Use this table to map symptoms to causes and solutions:

| Symptom | Likely Cause | Solution |
|---|---|---|
| High CPC, low CVR | Low Quality Score | Improve ad relevance and landing page |
| High CTR, low CVR | Misleading ad copy or poor landing page | Align ad promise with landing page |
| Low CTR | Irrelevant keywords or weak ad copy | Add negative keywords, rewrite headlines |
| Spend but no conversions | Conversion tracking broken, or wrong audience | Verify conversion tags, tighten targeting |
| Budget depleted early in day | Underbidding + high competition | Increase budget or switch to Target CPA |
| High IS Lost (Rank) | Low bids or poor Quality Score | Raise bids or improve relevance |
| Broad Match overspending | Too many irrelevant search terms | Add negatives, switch to Phrase/Exact |

---

## Analysis Guidelines

- Always lead with the highest-impact finding, not a metric list
- Quantify every recommendation: "Pausing these 5 keywords saves $X/month"
- When data is incomplete, state assumptions clearly
- For Shopping or Performance Max campaigns, note that keyword-level data is limited
- Flag if conversion tracking appears broken (conversions = 0 with substantial spend)
- Reference industry benchmarks when helpful (see `references/performance-benchmarks.md`)
- Use the metrics glossary when explaining unfamiliar terms (see `references/metrics-glossary.md`)

## References
- `references/metrics-glossary.md` — definitions for all Google Ads metrics
- `references/performance-benchmarks.md` — average CTR, CPC, CVR, and CPA by industry
