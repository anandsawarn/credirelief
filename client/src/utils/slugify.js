export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findBySlug(items, slug, labelKey = 'label') {
  return items.find((item) => slugify(item[labelKey] ?? item) === slug);
}

export function serviceTitleToLoanType(serviceTitle) {
  const title = String(serviceTitle).toLowerCase();

  if (title.includes('personal')) return 'Personal Loan';
  if (title.includes('credit card')) return 'Credit Card';
  if (title.includes('business')) return 'Business Loan';
  if (title.includes('car')) return 'Car Loan';
  if (title.includes('app')) return 'App Loan';
  if (title.includes('nbfc')) return 'NBFC Loan';

  return 'Personal Loan';
}