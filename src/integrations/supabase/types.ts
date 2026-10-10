export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      beneficiaries: {
        Row: {
          aadhaar_no: string
          account_no: string
          area_under_bamboo_ha: number
          bamboo_species: string | null
          bank_branch: string
          bank_name: string
          block: string
          category: string
          component: string
          created_at: string
          date_of_birth: string
          district: string
          email: string | null
          father_husband_name: string
          full_name: string
          gender: string
          gram_panchayat: string | null
          id: string
          ifsc: string
          khasra_no: string | null
          land_type: string | null
          mobile: string
          pincode: string
          registration_no: string
          spacing: string | null
          state: string
          status: string
          total_land_area_ha: number
          updated_at: string
          user_id: string
          village: string
          year_of_plantation: number | null
        }
        Insert: {
          aadhaar_no: string
          account_no: string
          area_under_bamboo_ha: number
          bamboo_species?: string | null
          bank_branch: string
          bank_name: string
          block: string
          category: string
          component: string
          created_at?: string
          date_of_birth: string
          district: string
          email?: string | null
          father_husband_name: string
          full_name: string
          gender: string
          gram_panchayat?: string | null
          id?: string
          ifsc: string
          khasra_no?: string | null
          land_type?: string | null
          mobile: string
          pincode: string
          registration_no?: string
          spacing?: string | null
          state: string
          status?: string
          total_land_area_ha: number
          updated_at?: string
          user_id: string
          village: string
          year_of_plantation?: number | null
        }
        Update: {
          aadhaar_no?: string
          account_no?: string
          area_under_bamboo_ha?: number
          bamboo_species?: string | null
          bank_branch?: string
          bank_name?: string
          block?: string
          category?: string
          component?: string
          created_at?: string
          date_of_birth?: string
          district?: string
          email?: string | null
          father_husband_name?: string
          full_name?: string
          gender?: string
          gram_panchayat?: string | null
          id?: string
          ifsc?: string
          khasra_no?: string | null
          land_type?: string | null
          mobile?: string
          pincode?: string
          registration_no?: string
          spacing?: string | null
          state?: string
          status?: string
          total_land_area_ha?: number
          updated_at?: string
          user_id?: string
          village?: string
          year_of_plantation?: number | null
        }
        Relationships: []
      }
      beneficiary_documents: {
        Row: {
          beneficiary_id: string
          created_at: string
          doc_type: string
          file_name: string
          file_path: string
          id: string
          mime_type: string | null
          notes: string | null
          size_bytes: number | null
          user_id: string
        }
        Insert: {
          beneficiary_id: string
          created_at?: string
          doc_type: string
          file_name: string
          file_path: string
          id?: string
          mime_type?: string | null
          notes?: string | null
          size_bytes?: number | null
          user_id: string
        }
        Update: {
          beneficiary_id?: string
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          notes?: string | null
          size_bytes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beneficiary_documents_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      state_users: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          mobile: string | null
          state_code: string | null
          role: Database["public"]["Enums"]["nbm_role"]
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          mobile?: string | null
          state_code?: string | null
          role: Database["public"]["Enums"]["nbm_role"]
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          mobile?: string | null
          state_code?: string | null
          role?: Database["public"]["Enums"]["nbm_role"]
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      monthly_entries: {
        Row: {
          id: string
          state_code: string
          month_year: string
          activity: string
          beneficiary_name: string
          beneficiary_type: string
          father_husband_name: string | null
          gender: string | null
          age: number | null
          category: string | null
          mobile: string | null
          village: string | null
          block: string | null
          district: string | null
          state: string | null
          pin_code: string | null
          total_project_investment_lakhs: number | null
          center_share_lakhs: number | null
          state_share_lakhs: number | null
          total_capacity: string | null
          employment_generated: number | null
          status: string
          submitted_at: string | null
          created_by: string
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          state_code: string
          month_year: string
          activity: string
          beneficiary_name: string
          beneficiary_type: string
          father_husband_name?: string | null
          gender?: string | null
          age?: number | null
          category?: string | null
          mobile?: string | null
          village?: string | null
          block?: string | null
          district?: string | null
          state?: string | null
          pin_code?: string | null
          total_project_investment_lakhs?: number | null
          center_share_lakhs?: number | null
          state_share_lakhs?: number | null
          total_capacity?: string | null
          employment_generated?: number | null
          status?: string
          submitted_at?: string | null
          created_by: string
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          state_code?: string
          month_year?: string
          activity?: string
          beneficiary_name?: string
          beneficiary_type?: string
          father_husband_name?: string | null
          gender?: string | null
          age?: number | null
          category?: string | null
          mobile?: string | null
          village?: string | null
          block?: string | null
          district?: string | null
          state?: string | null
          pin_code?: string | null
          total_project_investment_lakhs?: number | null
          center_share_lakhs?: number | null
          state_share_lakhs?: number | null
          total_capacity?: string | null
          employment_generated?: number | null
          status?: string
          submitted_at?: string | null
          created_by?: string
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      entry_comments: {
        Row: {
          id: string
          entry_id: string
          author_id: string
          author_role: string
          message: string
          parent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          entry_id: string
          author_id: string
          author_role: string
          message: string
          parent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          entry_id?: string
          author_id?: string
          author_role?: string
          message?: string
          parent_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          id: string
          sent_by: string
          target_state_code: string | null
          target_user_id: string | null
          month_year: string | null
          message: string
          is_read: boolean
          sent_at: string
        }
        Insert: {
          id?: string
          sent_by: string
          target_state_code?: string | null
          target_user_id?: string | null
          month_year?: string | null
          message: string
          is_read?: boolean
          sent_at?: string
        }
        Update: {
          id?: string
          sent_by?: string
          target_state_code?: string | null
          target_user_id?: string | null
          month_year?: string | null
          message?: string
          is_read?: boolean
          sent_at?: string
        }
        Relationships: []
      }
      submission_cycles: {
        Row: {
          id: string
          state_code: string
          month_year: string
          editor_deadline: string
          reviewer_deadline: string
          editor_submitted_at: string | null
          reviewer_finalised_at: string | null
          overall_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          state_code: string
          month_year: string
          editor_deadline: string
          reviewer_deadline: string
          editor_submitted_at?: string | null
          reviewer_finalised_at?: string | null
          overall_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          state_code?: string
          month_year?: string
          editor_deadline?: string
          reviewer_deadline?: string
          editor_submitted_at?: string | null
          reviewer_finalised_at?: string | null
          overall_status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_state_role: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "state" | "beneficiary"
      nbm_role: "state_editor" | "state_reviewer" | "nbm_central"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "state", "beneficiary"],
    },
  },
} as const
