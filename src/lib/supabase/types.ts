
export type Restaurant = {
  id: string;
  name: string;
  city: string;
  active: boolean;
  created_at?: string;
};

export type FinancialData = {
  id: string;
  restaurant_id: string;
  date: string;
  revenue: number;
  expenses: number;
  net_profit?: number;
  clients: number;
  avg_ticket: number;
  created_at?: string;
};

export type Projection = {
  id: string;
  restaurant_id: string;
  period: string;
  expected_revenue: number;
  expected_expenses: number;
  notes?: string;
  created_at?: string;
};

export type Alert = {
  id: string;
  restaurant_id: string;
  date: string;
  type: "alert" | "suggestion" | "risk";
  content: string;
  read: boolean;
  created_at?: string;
};

export type AIPrediction = {
  id: string;
  date: string;
  input_data: any;
  forecast: number;
  comments?: string;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: Restaurant;
        Insert: Omit<Restaurant, "id" | "created_at">;
        Update: Partial<Omit<Restaurant, "id" | "created_at">>;
      };
      financial_data: {
        Row: FinancialData;
        Insert: Omit<FinancialData, "id" | "created_at" | "net_profit">;
        Update: Partial<Omit<FinancialData, "id" | "created_at" | "net_profit">>;
      };
      projections: {
        Row: Projection;
        Insert: Omit<Projection, "id" | "created_at">;
        Update: Partial<Omit<Projection, "id" | "created_at">>;
      };
      alerts: {
        Row: Alert;
        Insert: Omit<Alert, "id" | "created_at">;
        Update: Partial<Omit<Alert, "id" | "created_at">>;
      };
      ai_predictions: {
        Row: AIPrediction;
        Insert: Omit<AIPrediction, "id" | "created_at">;
        Update: Partial<Omit<AIPrediction, "id" | "created_at">>;
      };
    };
  };
};
