export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          cook_id: string
          created_at: string
          customer_id: string
          end_time: string
          id: string
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          special_instructions: string | null
          start_time: string
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          booking_date: string
          cook_id: string
          created_at?: string
          customer_id: string
          end_time: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          special_instructions?: string | null
          start_time: string
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          booking_date?: string
          cook_id?: string
          created_at?: string
          customer_id?: string
          end_time?: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          special_instructions?: string | null
          start_time?: string
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      cooks: {
        Row: {
          average_rating: number | null
          bio: string | null
          created_at: string
          hourly_rate: number
          id: string
          is_available: boolean | null
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          speciality: string | null
          updated_at: string
          years_of_experience: number | null
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          hourly_rate?: number
          id: string
          is_available?: boolean | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          speciality?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          hourly_rate?: number
          id?: string
          is_available?: boolean | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          speciality?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cooks_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          cook_id: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          ingredients: string | null
          is_veg: boolean | null
          preparation_time: string | null
          price: number
          rating: number | null
          review_count: number | null
          title: string
          updated_at: string
        }
        Insert: {
          cook_id: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string | null
          is_veg?: boolean | null
          preparation_time?: string | null
          price: number
          rating?: number | null
          review_count?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          cook_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string | null
          is_veg?: boolean | null
          preparation_time?: string | null
          price?: number
          rating?: number | null
          review_count?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          delivery_address: string | null
          delivery_notes: string | null
          id: string
          meal_id: string
          quantity: number
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          delivery_address?: string | null
          delivery_notes?: string | null
          id?: string
          meal_id: string
          quantity?: number
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          delivery_address?: string | null
          delivery_notes?: string | null
          id?: string
          meal_id?: string
          quantity?: number
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          cook_id: string | null
          created_at: string
          id: string
          meal_id: string | null
          rating: number
          reviewer_id: string
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          cook_id?: string | null
          created_at?: string
          id?: string
          meal_id?: string | null
          rating: number
          reviewer_id: string
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          cook_id?: string | null
          created_at?: string
          id?: string
          meal_id?: string | null
          rating?: number
          reviewer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
