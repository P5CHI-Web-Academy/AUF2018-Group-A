import Foundation


fileprivate let JSON_URL_STRING = "https://jsonplaceholder.typicode.com/todos/1"

struct Some {
    var userId: Int
    var id: Int
    var title: String
    var completed: Bool

    init(json: [String : Any]) {
        userId = json["userId"] as? Int ?? 0
        id = json["id"] as? Int ?? 0
        title = json["title"] as? String ?? ""
        completed = json["completed"] as? Bool ?? false
    }
}

 func getJson() { //(completionHandler: (Some) -> ()? {
     guard let url = URL(string: JSON_URL_STRING) else { return }

     let defaultSession = URLSession(configuration: .default)
     let task = defaultSession.dataTask(with: url) {
          (data, response, error) -> Void in
          //check for any errors
        guard error == nil else {
            print("error calling GET on /todos/1")
            print(error!)
            return
        }
        if let data = data {
            if let obj = parseJSON(data) {
           //     completionHandler(obj)
            }
        }
    }
    task.resume()
 }

 func parseJSON(_ data: Data) -> Some? {
   guard let json = try JSONSerialization.jsonObject(with: data, options: [])
        as? [String: Any] else {
          print("error trying to convert data to JSON")
          return nil
    } catch error {
        print ("error")
    }

    return Some(json: json)
 }