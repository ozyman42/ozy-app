#[tauri::mobile_entry_point]
fn main() {
  super::AppBuilder::new().run();
}

#[tauri::command]
fn custom_command(input_msg: String) -> String {
  println!("A custom command was called with input {}", input_msg);
  "Hello from Rust!".into()
}