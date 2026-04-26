# Security Specification

## Data Invariants
- A quote request must have a name, phone, and details.
- Quotes are public to create but private to read (admin only).
- Corporate leads follow the same pattern.
- Admins are defined in a restricted `/admins/` collection.

## The Dirty Dozen Payloads
1. **Quote Creation without Name**: `{ "phone": "0400", "details": "Broken" }` -> Denied.
2. **Quote Creation with Shadow Field**: `{ "name": "Hack", "phone": "0400", "details": "Broken", "isAdmin": true }` -> Denied (Extra field).
3. **Admin Escalation**: Try to create a document in `/admins/` -> Denied.
4. **Unauthorized Read**: Try to list `/quotes/` as a guest or non-admin -> Denied.
5. **Quote Update (Identity Spoof)**: Try to change `createdAt` of a quote -> Denied.
6. **Quote Modification (Non-whitelisted)**: Try to update `name` of an existing quote -> Denied (Only `status` and `updatedAt` allowed).
7. **Resource Poisoning (ID)**: Try to create a document with a 2KB string as ID -> Denied.
8. **Value Poisoning**: Try to set `status` to "invalid_status" -> Denied.
9. **Email Spoofing**: Log in as someone else and try to read admins -> Denied.
10. **Query Scraping**: Try a collection group query on all documents -> Denied.
11. **Pillars Violation**: Try to write as admin but with malformed data -> Denied.
12. **Timestamp Fraud**: Send a client-side timestamp for `createdAt` instead of `request.time` -> Denied.

## Test Runner (Draft)
```ts
// firestore.rules.test.ts (summary)
test('Public can create quotes but not read them', async () => { ... });
test('Only admins can read/update quotes', async () => { ... });
test('Strict schema validation prevents shadow fields', async () => { ... });
```
