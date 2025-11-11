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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["blog_status"] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["blog_status"] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["blog_status"] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          responded_by: string | null
          status: Database["public"]["Enums"]["message_status"] | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          subject?: string | null
        }
        Relationships: []
      }
      content_blocks: {
        Row: {
          background_color: string | null
          block_key: string
          content: string | null
          created_at: string
          icon: string | null
          id: string
          is_active: boolean | null
          order_position: number | null
          title: string
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          block_key: string
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_position?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          block_key?: string
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_position?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string | null
          max_participants: number | null
          registration_link: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          max_participants?: number | null
          registration_link?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          max_participants?: number | null
          registration_link?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_featured: boolean | null
          order_position: number | null
          photographer: string | null
          taken_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          order_position?: number | null
          photographer?: string | null
          taken_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          order_position?: number | null
          photographer?: string | null
          taken_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_sections: {
        Row: {
          background_image_url: string | null
          badge_icon: string | null
          badge_text: string | null
          created_at: string
          cta_primary_link: string | null
          cta_primary_text: string | null
          cta_secondary_link: string | null
          cta_secondary_text: string | null
          description: string | null
          id: string
          is_active: boolean | null
          order_position: number | null
          page_slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          badge_icon?: string | null
          badge_text?: string | null
          created_at?: string
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_position?: number | null
          page_slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          badge_icon?: string | null
          badge_text?: string | null
          created_at?: string
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_position?: number | null
          page_slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      impact_metrics: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_active: boolean | null
          label: string
          order_position: number | null
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          order_position?: number | null
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          order_position?: number | null
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          order_position: number | null
          partnership_type: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          order_position?: number | null
          partnership_type?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          order_position?: number | null
          partnership_type?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      pillars: {
        Row: {
          color_theme: string | null
          created_at: string
          description: string | null
          detailed_content: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order_position: number | null
          title: string
          updated_at: string
        }
        Insert: {
          color_theme?: string | null
          created_at?: string
          description?: string | null
          detailed_content?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_position?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          color_theme?: string | null
          created_at?: string
          description?: string | null
          detailed_content?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_position?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          order_position: number | null
          project_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          order_position?: number | null
          project_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          order_position?: number | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          beneficiaries_count: number | null
          budget: number | null
          category: string | null
          created_at: string
          end_date: string | null
          featured_image_url: string | null
          full_description: string | null
          id: string
          is_featured: boolean | null
          location: string | null
          order_position: number | null
          pillar_id: string | null
          short_description: string | null
          slug: string
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          beneficiaries_count?: number | null
          budget?: number | null
          category?: string | null
          created_at?: string
          end_date?: string | null
          featured_image_url?: string | null
          full_description?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string | null
          order_position?: number | null
          pillar_id?: string | null
          short_description?: string | null
          slug: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          beneficiaries_count?: number | null
          budget?: number | null
          category?: string | null
          created_at?: string
          end_date?: string | null
          featured_image_url?: string | null
          full_description?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string | null
          order_position?: number | null
          pillar_id?: string | null
          short_description?: string | null
          slug?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          contact_address: string | null
          contact_email: string | null
          contact_phone: string | null
          description: string | null
          facebook_url: string | null
          favicon_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          logo_url: string | null
          site_name: string
          tagline: string | null
          twitter_url: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          description?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          site_name?: string
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          description?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          site_name?: string
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          order_position: number | null
          photo_url: string | null
          position: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          order_position?: number | null
          photo_url?: string | null
          position: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          order_position?: number | null
          photo_url?: string | null
          position?: string
          updated_at?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "editor" | "viewer"
      blog_status: "draft" | "published" | "archived"
      event_status: "upcoming" | "ongoing" | "completed" | "cancelled"
      message_status: "new" | "read" | "responded" | "archived"
      project_status: "planning" | "active" | "completed"
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
      app_role: ["super_admin", "editor", "viewer"],
      blog_status: ["draft", "published", "archived"],
      event_status: ["upcoming", "ongoing", "completed", "cancelled"],
      message_status: ["new", "read", "responded", "archived"],
      project_status: ["planning", "active", "completed"],
    },
  },
} as const
