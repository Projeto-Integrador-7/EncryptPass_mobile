import { useState } from "react";

import { User } from "../models/user";

export function AuthProvider(){
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  

}