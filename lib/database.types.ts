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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      resume_generations: {
        Row: {
          id: string
          user_id: string | null
          job_description: string
          skills_and_projects: string
          generated_intro: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          job_description: string
          skills_and_projects: string
          generated_intro: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          job_description?: string
          skills_and_projects?: string
          generated_intro?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}