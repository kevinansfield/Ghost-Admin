- updated_at will never get older for known posts
- posts loaded individually through the ID may have earlier updated_at than the last seen in a list
- if cached post lists only care about their known IDs then posts loaded elsewhere in the app don't affect anything
- when viewing a list the order will be re-calculated after fetching all models via the known IDs, this covers the problem with `updated_at` getting changed in the cache via different lists or when editing
- background refresh will get all updated since the last known `updated_at` and then reorder again

- how to handle the opposite order?
