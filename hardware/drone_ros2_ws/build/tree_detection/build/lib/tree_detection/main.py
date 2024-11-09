import rclpy
from rclpy.node import Node
from sensor_msgs.msg import CompressedImage
from cv_bridge import CvBridge
import cv2
import numpy as np
import requests
import traceback

url = "http://127.0.0.1:5000/predict"

class ImageSubscriber(Node):
    def __init__(self):
        super().__init__('image_subscriber')
        self.get_logger().info("node started")
        self.subscription = self.create_subscription(
            CompressedImage,
            '/image_raw/compressed',
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        # self.get_logger().info("image rcv")
        np_arr = np.frombuffer(msg.data, np.uint8)
        cv_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        try:
            self.get_logger().info("check1")
            _, encoded_image = cv2.imencode('.jpg', cv_image)
            image_bytes = encoded_image.tobytes()

            self.get_logger().info("check2")
            files = {'image': (image_bytes)}

            self.get_logger().info("check3")
            response = requests.post(url, files=files)

            self.get_logger().info("check4")
            # self.get_logger().info(response)
        
        except Exception as e:
            self.get_logger().error(f"Error occurred: {e}")
            self.get_logger().error(traceback.format_exc())  # Log the full traceback
        
        cv2.imshow("Camera Image", cv_image)
        cv2.waitKey(1)
        # self.destroy_node()
        # rclpy.shutdown()
        # cv2.destroyAllWindows()


def main(args=None):
    rclpy.init(args=args)
    node = ImageSubscriber()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('Shutting down')
    finally:
        node.destroy_node()
        rclpy.shutdown()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    main()