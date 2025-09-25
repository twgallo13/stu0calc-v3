# Project Momentum: Architectural Non-Negotiables (v3.0)

This document summarizes the locked-in core rules and requirements from the v3.0 Software Design Document. All development must adhere to these points.

## Core Calculation Logic

-   **Rounding (MOM-3):** All intermediate financial calculations producing fractional cents **must** be rounded half-up to the nearest integer cent *immediately* after the operation. Subsequent operations (e.g., `max()`, additions) will use these already-rounded values.
-   **S&H Blending:** When calculating the blended S&H cost, each weighted term (`rate * percentage`) must be rounded individually *before* they are summed together.
-   **Fulfillment (MOM-2):** The per-order fulfillment cost is the `max()` of the AOV-based cost and the unit-based cost.
    -   `Cost_AOV = round(AOV_dollars * 100 * aovPercentage)`
    -   `Cost_Units = baseFeeCents + (perAdditionalUnitCents * (UTP - 1))`
    -   `Final = max(Cost_AOV, Cost_Units)`

## Data & Naming Conventions

-   **S&H Model Token (MOM-1):** The identifier for the client's own shipping account is `customerAccount` (camelCase). This must be used consistently in data models, logic, and UI.

## Key Feature Requirements

-   **Rate Card Versioning (MOM-5):** Rate cards are immutable. Updates must create a new version with corresponding notes. Quotes are permanently locked to the rate card version used for their creation.
-   **Input Normalization (MOM-4):** The UI must accept a `shippingSizeMix` percentage total between 99.5% and 100.5%, auto-normalize the values to sum to 100%, and show a non-blocking user hint.
-   **Configurable Warnings (MOM-6):** The "High Discount Warning" threshold in the Client Harmonization Tool must be configurable by an administrator.

## Non-Functional Requirements (NFRs)

-   **Performance (MOM-7):**
    -   Initial Load: < 3s (cold) / < 1.5s (warm)
    -   UI Interaction (P95): < 300ms
    -   Slider Recalculation: < 16ms
-   **Accessibility (MOM-8):**
    -   Visible focus states for all interactive elements.
    -   Keyboard-only operability.
    -   `ESC` key to close panels/modals.
    -   Real-time metrics must use `aria-live="polite"`.
    -   WCAG 2.2 AA contrast compliance.
