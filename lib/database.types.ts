export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      product: {
        Row: {
          brand_id: string
          category_id: string
          created_at: string
          created_by: string
          description: string
          details: string | null
          id: string
          intensity_id: string
          inventory_id: string | null
          is_archived: boolean
          is_featured: boolean | null
          name: string
          occasion_id: string
          price: number
          scent_cluster_id: string
        }
        Insert: {
          brand_id: string
          category_id: string
          created_at?: string
          created_by: string
          description: string
          details?: string | null
          id?: string
          intensity_id: string
          inventory_id?: string | null
          is_archived?: boolean
          is_featured?: boolean | null
          name: string
          occasion_id: string
          price: number
          scent_cluster_id: string
        }
        Update: {
          brand_id?: string
          category_id?: string
          created_at?: string
          created_by?: string
          description?: string
          details?: string | null
          id?: string
          intensity_id?: string
          inventory_id?: string | null
          is_archived?: boolean
          is_featured?: boolean | null
          name?: string
          occasion_id?: string
          price?: number
          scent_cluster_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "product_brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_intensity_id_fkey"
            columns: ["intensity_id"]
            referencedRelation: "product_intensity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_inventory_id_fkey"
            columns: ["inventory_id"]
            referencedRelation: "product_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_occasion_id_fkey"
            columns: ["occasion_id"]
            referencedRelation: "product_ocassion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_scent_cluster_id_fkey"
            columns: ["scent_cluster_id"]
            referencedRelation: "product_scent_cluster"
            referencedColumns: ["id"]
          }
        ]
      }
      product_brand: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      product_category: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      product_image: {
        Row: {
          id: number
          product_id: string
          url: string
        }
        Insert: {
          id?: number
          product_id: string
          url: string
        }
        Update: {
          id?: number
          product_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
      }
      product_intensity: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          rating: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          rating: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          rating?: number
        }
        Relationships: []
      }
      product_inventory: {
        Row: {
          created_at: string
          id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          quantity?: number
        }
        Relationships: []
      }
      product_ocassion: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      product_scent_cluster: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          creation_time: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          username: string | null
        }
        Insert: {
          creation_time?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
          username?: string | null
        }
        Update: {
          creation_time?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
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
