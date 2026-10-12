/** Shared mapping between API monthly_entries rows and editor form strings. */

export type EditorEntryFormValues = {
  activity: string;
  beneficiary_name: string;
  beneficiary_type: string;
  father_husband_name: string;
  gender: string;
  age: string;
  category: string;
  mobile: string;
  village: string;
  block: string;
  district: string;
  state: string;
  pin_code: string;
  total_project_investment_lakhs: string;
  center_share_lakhs: string;
  state_share_lakhs: string;
  total_capacity: string;
  employment_generated: string;
};

export function emptyEditorEntryForm(defaultStateLabel = ""): EditorEntryFormValues {
  return {
    activity: "",
    beneficiary_name: "",
    beneficiary_type: "",
    father_husband_name: "",
    gender: "",
    age: "",
    category: "",
    mobile: "",
    village: "",
    block: "",
    district: "",
    state: defaultStateLabel,
    pin_code: "",
    total_project_investment_lakhs: "",
    center_share_lakhs: "",
    state_share_lakhs: "",
    total_capacity: "",
    employment_generated: "",
  };
}

export function monthlyEntryToFormValues(
  entry: Record<string, unknown>,
  defaultStateLabel = "",
): EditorEntryFormValues {
  const str = (value: unknown) => (value == null || value === "" ? "" : String(value));
  return {
    activity: str(entry.activity),
    beneficiary_name: str(entry.beneficiary_name),
    beneficiary_type: str(entry.beneficiary_type),
    father_husband_name: str(entry.father_husband_name),
    gender: str(entry.gender),
    age: entry.age != null ? String(entry.age) : "",
    category: str(entry.category),
    mobile: str(entry.mobile),
    village: str(entry.village),
    block: str(entry.block),
    district: str(entry.district),
    state: str(entry.state) || defaultStateLabel,
    pin_code: str(entry.pin_code),
    total_project_investment_lakhs:
      entry.total_project_investment_lakhs != null ? String(entry.total_project_investment_lakhs) : "",
    center_share_lakhs: entry.center_share_lakhs != null ? String(entry.center_share_lakhs) : "",
    state_share_lakhs: entry.state_share_lakhs != null ? String(entry.state_share_lakhs) : "",
    total_capacity: str(entry.total_capacity),
    employment_generated:
      entry.employment_generated != null ? String(entry.employment_generated) : "",
  };
}

export function editorFormToPayload(formData: EditorEntryFormValues): Record<string, unknown> {
  return {
    activity: formData.activity,
    beneficiary_name: formData.beneficiary_name,
    beneficiary_type: formData.beneficiary_type,
    father_husband_name: formData.father_husband_name || null,
    gender: formData.gender || null,
    age: formData.age ? parseInt(formData.age, 10) : null,
    category: formData.category || null,
    mobile: formData.mobile,
    village: formData.village,
    block: formData.block,
    district: formData.district,
    state: formData.state || null,
    pin_code: formData.pin_code,
    total_project_investment_lakhs: formData.total_project_investment_lakhs
      ? parseFloat(formData.total_project_investment_lakhs)
      : null,
    center_share_lakhs: formData.center_share_lakhs ? parseFloat(formData.center_share_lakhs) : null,
    state_share_lakhs: formData.state_share_lakhs ? parseFloat(formData.state_share_lakhs) : null,
    total_capacity: formData.total_capacity || null,
    employment_generated: formData.employment_generated
      ? parseInt(formData.employment_generated, 10)
      : null,
  };
}
