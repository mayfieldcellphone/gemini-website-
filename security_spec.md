# Security Specification - Mayfield Phone Repair

## Data Invariants
1. A booking must have a future date and 'pending' status initial value.
2. A quote must include a valid phone number.
3. Chat messages must belong to an active session.
4. Inbox Leads must target a valid user ID and have 'new' status.
5. Administrative fields (like 'isAdmin' in chats) cannot be set by public users.

## The Dirty Dozen Payloads

1. **Identity Spoofing (Inbox):** Attempting to write a lead to a user ID the client doesn't "own" (though for public sync, we allow writes to the specific inbox ID).
2. **Ghost Field Injection:** Adding `isVerified: true` to a quote.
3. **Admin Escalation:** Setting `isAdmin: true` in a chat message.
4. **Status Shortcutting:** Creating a booking with `status: 'confirmed'`.
5. **Resource Poisoning:** Sending a 1MB string as the `details` field in a booking.
6. **ID Poisoning:** Using a malicious string like `../system/config` as a custom document ID.
7. **Temporal Fraud:** Setting `createdAt` to a date in the past instead of `request.time`.
8. **PII Blanket Read:** Attempting to list all bookings without being an admin.
9. **Orphaned Write:** Creating a chat message for a non-existent chat session.
10. **Terminal State Break:** Updating a 'completed' booking to 'pending'.
11. **Type Mismatch:** Sending a number for the `customerName` field.
12. **Unauthorized Deletion:** Attempting to delete a quote as a guest.

## Test Strategy
We will use `firestore.rules` to block all "Dirty Dozen" payloads by enforcing strict schema validation and identity checks.
