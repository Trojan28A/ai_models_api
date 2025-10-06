#!/usr/bin/env python3
"""
Backend API Testing for AI Models Hub
Tests all model fetching endpoints without requiring API keys
"""

import requests
import json
import sys
from typing import Dict, List, Any
import time

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

class AIModelsHubTester:
    def __init__(self):
        self.base_url = get_backend_url()
        if not self.base_url:
            raise Exception("Could not determine backend URL")
        
        self.api_url = f"{self.base_url}/api"
        self.test_results = []
        self.failed_tests = []
        
        print(f"Testing AI Models Hub API at: {self.api_url}")
        print("=" * 60)
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    {details}")
        
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
    
    def test_root_endpoint(self):
        """Test GET /api/ - Root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test(
                        "Root Endpoint (/api/)",
                        True,
                        f"Status: {response.status_code}, Message: {data.get('message')}"
                    )
                else:
                    self.log_test(
                        "Root Endpoint (/api/)",
                        False,
                        f"Missing expected fields in response: {data}"
                    )
            else:
                self.log_test(
                    "Root Endpoint (/api/)",
                    False,
                    f"Expected 200, got {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_test(
                "Root Endpoint (/api/)",
                False,
                f"Request failed: {str(e)}"
            )
    
    def test_get_all_models(self):
        """Test GET /api/models - Fetch all models"""
        try:
            response = requests.get(f"{self.api_url}/models", timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required fields
                if "models" in data and "count" in data:
                    models = data["models"]
                    count = data["count"]
                    
                    if isinstance(models, list) and len(models) > 0:
                        # Check if we have 400+ models as expected
                        if count >= 400:
                            self.log_test(
                                "Get All Models (/api/models)",
                                True,
                                f"Retrieved {count} models successfully"
                            )
                        else:
                            self.log_test(
                                "Get All Models (/api/models)",
                                False,
                                f"Expected 400+ models, got {count}"
                            )
                        
                        # Validate model structure
                        self.validate_model_structure(models[0] if models else {})
                        
                    else:
                        self.log_test(
                            "Get All Models (/api/models)",
                            False,
                            f"Models array is empty or invalid: {len(models)} models"
                        )
                else:
                    self.log_test(
                        "Get All Models (/api/models)",
                        False,
                        f"Missing required fields 'models' or 'count': {list(data.keys())}"
                    )
            else:
                self.log_test(
                    "Get All Models (/api/models)",
                    False,
                    f"Expected 200, got {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_test(
                "Get All Models (/api/models)",
                False,
                f"Request failed: {str(e)}"
            )
    
    def test_filter_by_free_tier(self):
        """Test GET /api/models?tier=free - Filter models by free tier"""
        try:
            response = requests.get(f"{self.api_url}/models?tier=free", timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                
                if "models" in data and "count" in data:
                    models = data["models"]
                    count = data["count"]
                    
                    if isinstance(models, list):
                        # Verify all models have tier=free
                        all_free = all(model.get('tier') == 'free' for model in models)
                        
                        if all_free:
                            self.log_test(
                                "Filter by Free Tier (/api/models?tier=free)",
                                True,
                                f"Retrieved {count} free tier models, all correctly filtered"
                            )
                        else:
                            non_free = [m for m in models if m.get('tier') != 'free']
                            self.log_test(
                                "Filter by Free Tier (/api/models?tier=free)",
                                False,
                                f"Found {len(non_free)} non-free models in free tier filter"
                            )
                    else:
                        self.log_test(
                            "Filter by Free Tier (/api/models?tier=free)",
                            False,
                            "Models field is not a list"
                        )
                else:
                    self.log_test(
                        "Filter by Free Tier (/api/models?tier=free)",
                        False,
                        f"Missing required fields: {list(data.keys())}"
                    )
            else:
                self.log_test(
                    "Filter by Free Tier (/api/models?tier=free)",
                    False,
                    f"Expected 200, got {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_test(
                "Filter by Free Tier (/api/models?tier=free)",
                False,
                f"Request failed: {str(e)}"
            )
    
    def test_filter_by_text_category(self):
        """Test GET /api/models?category=text - Filter models by text category"""
        try:
            response = requests.get(f"{self.api_url}/models?category=text", timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                
                if "models" in data and "count" in data:
                    models = data["models"]
                    count = data["count"]
                    
                    if isinstance(models, list):
                        # Verify all models have category=text
                        all_text = all(model.get('category') == 'text' for model in models)
                        
                        if all_text:
                            self.log_test(
                                "Filter by Text Category (/api/models?category=text)",
                                True,
                                f"Retrieved {count} text category models, all correctly filtered"
                            )
                        else:
                            non_text = [m for m in models if m.get('category') != 'text']
                            self.log_test(
                                "Filter by Text Category (/api/models?category=text)",
                                False,
                                f"Found {len(non_text)} non-text models in text category filter"
                            )
                    else:
                        self.log_test(
                            "Filter by Text Category (/api/models?category=text)",
                            False,
                            "Models field is not a list"
                        )
                else:
                    self.log_test(
                        "Filter by Text Category (/api/models?category=text)",
                        False,
                        f"Missing required fields: {list(data.keys())}"
                    )
            else:
                self.log_test(
                    "Filter by Text Category (/api/models?category=text)",
                    False,
                    f"Expected 200, got {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_test(
                "Filter by Text Category (/api/models?category=text)",
                False,
                f"Request failed: {str(e)}"
            )
    
    def test_get_specific_model(self):
        """Test GET /api/models/deepseek-v3 - Get specific model by name"""
        try:
            response = requests.get(f"{self.api_url}/models/deepseek-v3", timeout=30)
            
            if response.status_code == 200:
                model = response.json()
                
                # Check if it's a valid model object
                if isinstance(model, dict) and ("name" in model or "base_model" in model):
                    model_name = model.get('name') or model.get('base_model', '')
                    
                    # Check if the returned model matches the requested one
                    if 'deepseek-v3' in model_name.lower():
                        self.log_test(
                            "Get Specific Model (/api/models/deepseek-v3)",
                            True,
                            f"Retrieved model: {model_name}"
                        )
                        
                        # Validate model structure
                        self.validate_model_structure(model)
                    else:
                        self.log_test(
                            "Get Specific Model (/api/models/deepseek-v3)",
                            False,
                            f"Returned model '{model_name}' doesn't match requested 'deepseek-v3'"
                        )
                else:
                    self.log_test(
                        "Get Specific Model (/api/models/deepseek-v3)",
                        False,
                        f"Invalid model object returned: {model}"
                    )
                    
            elif response.status_code == 404:
                self.log_test(
                    "Get Specific Model (/api/models/deepseek-v3)",
                    False,
                    "Model 'deepseek-v3' not found (404). This might be expected if the model doesn't exist."
                )
            else:
                self.log_test(
                    "Get Specific Model (/api/models/deepseek-v3)",
                    False,
                    f"Expected 200, got {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_test(
                "Get Specific Model (/api/models/deepseek-v3)",
                False,
                f"Request failed: {str(e)}"
            )
    
    def validate_model_structure(self, model: Dict):
        """Validate that a model has the expected structure"""
        expected_fields = ['name', 'description', 'type', 'tier', 'category']
        optional_fields = ['proxy_providers', 'features', 'base_model']
        
        missing_fields = []
        for field in expected_fields:
            if field not in model:
                missing_fields.append(field)
        
        if missing_fields:
            self.log_test(
                "Model Structure Validation",
                False,
                f"Missing expected fields: {missing_fields}. Available fields: {list(model.keys())}"
            )
        else:
            present_optional = [f for f in optional_fields if f in model]
            self.log_test(
                "Model Structure Validation",
                True,
                f"All required fields present. Optional fields: {present_optional}"
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("Starting AI Models Hub Backend Tests...")
        print()
        
        # Test all endpoints
        self.test_root_endpoint()
        print()
        
        self.test_get_all_models()
        print()
        
        self.test_filter_by_free_tier()
        print()
        
        self.test_filter_by_text_category()
        print()
        
        self.test_get_specific_model()
        print()
        
        # Summary
        return self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\nFAILED TESTS:")
            print("-" * 40)
            for test in self.failed_tests:
                print(f"❌ {test['test']}")
                print(f"   {test['details']}")
                print()
        
        return failed_tests == 0

if __name__ == "__main__":
    try:
        tester = AIModelsHubTester()
        success = tester.run_all_tests()
        
        if success:
            print("🎉 All tests passed!")
            sys.exit(0)
        else:
            print("💥 Some tests failed!")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ Test setup failed: {e}")
        sys.exit(1)