import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ACTIVITY_OPTIONS,
  BENEFICIARY_TYPE_OPTIONS,
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  isIndividualBeneficiary,
} from "@/data/dropdowns";

type EditorEntryFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  defaultStateCode?: string | null;
};

export function EditorEntryForm({ open, onOpenChange, onSubmit, defaultStateCode }: EditorEntryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    state: defaultStateCode || "",
    pin_code: "",
    total_project_investment_lakhs: "",
    center_share_lakhs: "",
    state_share_lakhs: "",
    total_capacity: "",
    employment_generated: "",
  });

  const isIndividual = isIndividualBeneficiary(formData.beneficiary_type);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Reset individual fields if type changes away from Individual
      if (field === "beneficiary_type" && !isIndividualBeneficiary(value)) {
        next.father_husband_name = "";
        next.gender = "";
        next.age = "";
        next.category = "";
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    onOpenChange(false); // Close dialog on success
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Monthly Entry</DialogTitle>
          <DialogDescription>
            Fill out the details for the new entry. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          
          <div className="space-y-2 lg:col-span-3">
            <Label>Activity *</Label>
            <Select required onValueChange={(v) => handleChange("activity", v)}>
              <SelectTrigger><SelectValue placeholder="Select Activity" /></SelectTrigger>
              <SelectContent>
                {ACTIVITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Beneficiary Type *</Label>
            <Select required onValueChange={(v) => handleChange("beneficiary_type", v)}>
              <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
              <SelectContent>
                {BENEFICIARY_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <Label>Beneficiary Name *</Label>
            <Input required value={formData.beneficiary_name} onChange={(e) => handleChange("beneficiary_name", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Father's/Husband's Name</Label>
            <Input disabled={!isIndividual} required={isIndividual} value={formData.father_husband_name} onChange={(e) => handleChange("father_husband_name", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select disabled={!isIndividual} required={isIndividual} value={formData.gender} onValueChange={(v) => handleChange("gender", v)}>
              <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Age</Label>
            <Input type="number" disabled={!isIndividual} required={isIndividual} value={formData.age} onChange={(e) => handleChange("age", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select disabled={!isIndividual} required={isIndividual} value={formData.category} onValueChange={(v) => handleChange("category", v)}>
              <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mobile Number *</Label>
            <Input required pattern="[0-9]{10}" title="10 digit mobile number" value={formData.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Village *</Label>
            <Input required value={formData.village} onChange={(e) => handleChange("village", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Block *</Label>
            <Input required value={formData.block} onChange={(e) => handleChange("block", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>District *</Label>
            <Input required value={formData.district} onChange={(e) => handleChange("district", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Input disabled value={formData.state} />
          </div>

          <div className="space-y-2">
            <Label>PIN Code *</Label>
            <Input required pattern="[0-9]{6}" title="6 digit PIN code" value={formData.pin_code} onChange={(e) => handleChange("pin_code", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Total Project Investment (Lakhs)</Label>
            <Input type="number" step="0.01" value={formData.total_project_investment_lakhs} onChange={(e) => handleChange("total_project_investment_lakhs", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Center Share (Lakhs)</Label>
            <Input type="number" step="0.01" value={formData.center_share_lakhs} onChange={(e) => handleChange("center_share_lakhs", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>State Share (Lakhs)</Label>
            <Input type="number" step="0.01" value={formData.state_share_lakhs} onChange={(e) => handleChange("state_share_lakhs", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Total Capacity</Label>
            <Input value={formData.total_capacity} onChange={(e) => handleChange("total_capacity", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Employment Generated</Label>
            <Input type="number" value={formData.employment_generated} onChange={(e) => handleChange("employment_generated", e.target.value)} />
          </div>

          <DialogFooter className="lg:col-span-3 mt-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Draft"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
