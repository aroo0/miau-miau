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
          details: string
          id: string
          intensity_id: string
          is_archived: boolean
          is_featured: boolean
          name: string
          occasion_id: string
          price: number
          scent_cluster_id: string
          volume: string
        }
        Insert: {
          brand_id: string
          category_id: string
          created_at?: string
          created_by: string
          description: string
          details: string
          id?: string
          intensity_id: string
          is_archived?: boolean
          is_featured: boolean
          name: string
          occasion_id: string
          price: number
          scent_cluster_id: string
          volume: string
        }
        Update: {
          brand_id?: string
          category_id?: string
          created_at?: string
          created_by?: string
          description?: string
          details?: string
          id?: string
          intensity_id?: string
          is_archived?: boolean
          is_featured?: boolean
          name?: string
          occasion_id?: string
          price?: number
          scent_cluster_id?: string
          volume?: string
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
          },
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "random_product"
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
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_inventory_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_inventory_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "random_product"
            referencedColumns: ["id"]
          }
        ]
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
        }
        Insert: {
          creation_time?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
        }
        Update: {
          creation_time?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
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
      user_addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          company: string | null
          country: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          postcal_code: string
          primary: boolean
          telephone: string | null
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          company?: string | null
          country: string
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          postcal_code: string
          primary?: boolean
          telephone?: string | null
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          company?: string | null
          country?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          postcal_code?: string
          primary?: boolean
          telephone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      wishlist: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "random_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      random_product: {
        Row: {
          brand_id: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          details: string | null
          id: string | null
          intensity_id: string | null
          is_archived: boolean | null
          is_featured: boolean | null
          name: string | null
          occasion_id: string | null
          price: number | null
          scent_cluster_id: string | null
        }
        Insert: {
          brand_id?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          details?: string | null
          id?: string | null
          intensity_id?: string | null
          is_archived?: boolean | null
          is_featured?: boolean | null
          name?: string | null
          occasion_id?: string | null
          price?: number | null
          scent_cluster_id?: string | null
        }
        Update: {
          brand_id?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          details?: string | null
          id?: string | null
          intensity_id?: string | null
          is_archived?: boolean | null
          is_featured?: boolean | null
          name?: string | null
          occasion_id?: string | null
          price?: number | null
          scent_cluster_id?: string | null
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
