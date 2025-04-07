
-- Actualizar la función handle_new_user para soportar autenticación con Google
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  nombre text;
  usuario_existente int;
BEGIN
  -- Verificar si el usuario ya existe en la tabla profiles
  SELECT COUNT(*) INTO usuario_existente FROM profiles WHERE id = new.id;
  
  -- Si el usuario ya existe, no hacemos nada
  IF usuario_existente > 0 THEN
    RETURN new;
  END IF;

  -- Intentar obtener el nombre del usuario (primero de raw_user_meta_data, luego de identidades)
  IF new.raw_user_meta_data->>'nombre_completo' IS NOT NULL THEN
    -- Si es registro normal con email/password
    nombre := new.raw_user_meta_data->>'nombre_completo';
  ELSIF new.raw_user_meta_data->>'full_name' IS NOT NULL THEN
    -- A veces Google lo guarda como full_name
    nombre := new.raw_user_meta_data->>'full_name';
  ELSIF new.raw_user_meta_data->>'name' IS NOT NULL THEN
    -- A veces Google lo guarda como name
    nombre := new.raw_user_meta_data->>'name';
  ELSE
    -- Intentar obtener el nombre de las identidades (OAuth)
    SELECT 
      COALESCE(
        identities[1]->>'name',  -- Google a veces lo guarda aquí
        identities[1]->'identity_data'->>'name',  -- O aquí
        identities[1]->'identity_data'->>'full_name',  -- O aquí
        ''  -- Si no se encuentra, dejar vacío
      ) INTO nombre
    FROM auth.users
    WHERE id = new.id;
  END IF;

  -- Insertar en profiles con el nombre encontrado y rol 'analyst' por defecto
  INSERT INTO public.profiles (id, email, nombre_completo, rol)
  VALUES (new.id, new.email, nombre, 'analyst');
  
  RETURN new;
END;
$function$;
